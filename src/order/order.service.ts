import { BadGatewayException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel:Model<Order>
  ){}
  async create(createOrderDto: CreateOrderDto) {
    try {
      const transaction = await this.orderModel.create(
        createOrderDto,
      );
      return transaction;
    } catch (error) {
      this.handleExceptions(error);
    }
  }
  async findOne(id: string) {
    
      const order = await this.orderModel.findOne({orderId:id});
      if(!order){
        throw new NotFoundException(`Product with ${id} not found`);
      }
      return order;
     
  }
  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
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
