import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { HttpModule } from '@nestjs/axios';
import { ContractsModule } from '../contracts/contracts.module';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  imports: [HttpModule, ContractsModule,TransactionModule],
})
export class PaymentModule {}
