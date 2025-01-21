import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LaraService } from './lara.service';

@Module({
  imports: [ConfigModule],
  providers: [LaraService],
  exports: [LaraService],
})
export class LaraModule {}
