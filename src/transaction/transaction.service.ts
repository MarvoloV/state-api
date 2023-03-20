import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
  ) {}
  async create(createTransactionDto: CreateTransactionDto) {
    try {
      const transaction = await this.transactionModel.create(
        createTransactionDto,
      );
      return transaction;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    return await this.transactionModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
  private handleExceptions(error: any) {
    console.log(
      '🚀 ~ file: transaction.service.ts:38 ~ TransactionService ~ handleExceptions ~ error:',
      error,
    );
    // if (error.code === 11000) {
    //   throw new BadRequestException(
    //     `Pokemon exist in db ${JSON.stringify(error.keyValue)}`,
    //   );
    // }
    throw new InternalServerErrorException(
      `Can´t Update Pokemon - Check Server logs`,
    );
  }
}
