import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './entities/transaction.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
  imports: [HttpModule,
    ConfigModule,
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class TransactionModule {}
