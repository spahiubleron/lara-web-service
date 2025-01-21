import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TextsService } from './texts.service';
import { TextsController } from './texts.controller';
import { Text } from './entities/text.entity';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Text]),
    OrdersModule
  ],
  controllers: [TextsController],
  providers: [TextsService],
  exports: [SequelizeModule]
})
export class TextsModule {}
