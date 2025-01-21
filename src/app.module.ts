import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { TextsModule } from './texts/texts.module';
import { DatabaseModule } from './database/database.module';
import { LaraModule } from './lara/lara.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    OrdersModule, 
    TextsModule, 
    DatabaseModule,
    LaraModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
