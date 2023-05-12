import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.MintCoin(createPaymentDto);
  }
  @Post("generate-key")
  generateKey() {
    return this.paymentService.generateAccessToken();
  }
  @Post("orders")
  createOrder(){
    return this.paymentService.createOrder();
  }
  @Post("orders/:id/capture")
  captureOrder(
    @Param('id') id: string
  ){
    return this.paymentService.captureOrder(id);
  }
  @Get()
  totalSuppy(){
    return this.paymentService.getTotalSupply();
  }
}
