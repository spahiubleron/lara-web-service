import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Text } from './entities/text.entity';
import { CreateTextDto } from './dto/create-text.dto';
import { UpdateTextDto } from './dto/update-text.dto';
import { Order } from 'src/orders/entities/order.entity';

@Injectable()
export class TextsService {
  constructor(
    @InjectModel(Text)
    private textModel: typeof Text,
    @InjectModel(Order)
    private orderModel: typeof Order,
  ) {}

  async addTextToOrder(createTextDto: CreateTextDto): Promise<Text> {
    const order = await this.orderModel.findByPk(createTextDto.orderId);
    if (!order) {
      throw new NotFoundException(`Order with ID "${createTextDto.orderId}" not found`);
    }
    
    if (order.submissionTimestamp) {
      throw new BadRequestException('Cannot add text to an already submitted order.');
    }

    const text = await this.textModel.create({ ...createTextDto });
    return text;
  }

  async updateText(id: string, updateTextDto: UpdateTextDto): Promise<Text> {
    const text = await this.textModel.findByPk(id, {
      include: [Order]
    });

    if (!text) {
      throw new NotFoundException(`Text with ID "${id}" not found`);
    }

    if (text.order?.submissionTimestamp) {
      throw new BadRequestException('Cannot edit text from an already submitted order.');
    }

    await text.update({ text: updateTextDto.text });
    return text;
  }
}
