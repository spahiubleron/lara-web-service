import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Text } from '../texts/entities/text.entity';
import { LaraService } from '../lara/lara.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order)
    private orderModel: typeof Order,
    private readonly laraService: LaraService
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    if (!this.laraService.isLanguageSupported(createOrderDto.sourceLangCode)) {
      throw new BadRequestException(
        `Source language "${createOrderDto.sourceLangCode}" is not supported. Supported languages: ${this.laraService.getSupportedLanguages().join(', ')}`
      );
    }

    if (!this.laraService.isLanguageSupported(createOrderDto.targetLangCode)) {
      throw new BadRequestException(
        `Target language "${createOrderDto.targetLangCode}" is not supported. Supported languages: ${this.laraService.getSupportedLanguages().join(', ')}`
      );
    }

    const order = await this.orderModel.create({ ...createOrderDto });
    return order;
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderModel.findAll({
      attributes: ['id', 'jobName', 'sourceLangCode', 'targetLangCode', 'submissionTimestamp'],
    });
  }

  async getOrderById(id: string): Promise<Order> {
    const order = await this.orderModel.findByPk(id, {
      include: [Text]
    });
    if (!order) {
      throw new NotFoundException(`Order with ID "${id}" not found`);
    }
    return order;
  }

  async submitOrder(id: string): Promise<Order> {
    const order = await this.orderModel.findByPk(id, {
      include: [Text]
    });

    if (!order) {
      throw new NotFoundException(`Order with ID "${id}" not found`);
    }

    if (order.submissionTimestamp) {
      throw new BadRequestException('Order has already been submitted');
    }

    const textsToTranslate = order.texts.map(text => text.text);

    const translatedTexts = await this.laraService.translateTexts(
      textsToTranslate,
      order.sourceLangCode,
      order.targetLangCode
    );

    await Promise.all(
      order.texts.map(async (text, index) => {
        await text.update({
          translatedText: translatedTexts[index],
        });
      })
    );

    order.submissionTimestamp = new Date();
    await order.save();

    return order;
  }
}
