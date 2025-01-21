import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { LaraModule } from '../lara/lara.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Order]),
    LaraModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [SequelizeModule]
})
export class OrdersModule {}
