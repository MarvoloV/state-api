import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosRequestConfig } from 'axios';
import { Model } from 'mongoose';
import { lastValueFrom, map } from 'rxjs';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,private http: HttpService
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
  async getPaypalBearerToken() {
    const PAYPAL_CLIENT = process.env.PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

    const base64Token = Buffer.from(
      `${PAYPAL_CLIENT}:${PAYPAL_SECRET}`,
      'utf-8',
    ).toString('base64');
    const data = new URLSearchParams('grant_type=client_credentials');
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: `Basic ${base64Token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    try {
      const responseData = await lastValueFrom(
        this.http.post(process.env.PAYPAL_OAUTH_URL,data, requestConfig).pipe(
          map((response) => {
            return response.data;
          }),
        ),
      );
      return responseData;
    } catch (error) {
      throw error;
    }
  }
}
