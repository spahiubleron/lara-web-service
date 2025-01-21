import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all orders without texts' })
  @ApiResponse({ status: 200, description: 'Returns all orders', type: [Order] })
  getAllOrders() {
    return this.ordersService.getAllOrders();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new translation order' })
  @ApiResponse({ 
    status: 201, 
    description: 'The order has been successfully created.',
    type: Order 
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Post('/:id/submit')
  @ApiOperation({ summary: 'Submit an order for translation' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'The order has been successfully submitted.',
    type: Order 
  })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  submitOrder(@Param('id') id: string) {
    return this.ordersService.submitOrder(id);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'The order has been successfully retrieved.',
    type: Order 
  })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  getOrderById(@Param('id') id: string) {
    return this.ordersService.getOrderById(id);
  }
}
