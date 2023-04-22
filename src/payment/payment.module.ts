import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  imports:[HttpModule]
})
export class PaymentModule {}
