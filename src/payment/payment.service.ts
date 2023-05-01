import { BadRequestException, Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { lastValueFrom, map } from 'rxjs';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { HttpService } from '@nestjs/axios';
import { ContractsService } from 'src/contracts/contracts.service';
import { Model } from 'mongoose';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { InjectModel } from '@nestjs/mongoose';
import { IMintCoin } from './interfaces/IMintCoin';
import { CreateTransactionDto } from 'src/transaction/dto/create-transaction.dto';

@Injectable()
export class PaymentService {
  constructor(
    private http: HttpService,
    private readonly contractService: ContractsService,
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,
  ) {}
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
        this.http.post(process.env.PAYPAL_OAUTH_URL, data, requestConfig).pipe(
          map((response) => {
            return response.data;
          }),
        ),
      );
      return responseData.access_token;
    } catch (error) {
      console.log("🚀 ~ file: payment.service.ts:47 ~ PaymentService ~ getPaypalBearerToken ~ error:", error)
      throw new BadRequestException({
        message:error
      });
    }
  }
  async payOrder(createPaymentDto: CreatePaymentDto) {
    const paypalBearerToken = await this.getPaypalBearerToken();
    if (!paypalBearerToken) {
      throw new BadRequestException({
        message: 'No se pudo confirmar el token de paypal',
      });
    }
    try {
      const requestConfig: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${paypalBearerToken}`,
        },
      };
      const responseData = await lastValueFrom(
        this.http
          .get(
            `${process.env.PAYPAL_ORDERS_URL}/${createPaymentDto.transactionId}`,
            requestConfig,
          )
          .pipe(
            map((response) => {
              return response.data;
            }),
          ),
      );
      return responseData;
    } catch (error) {
      console.log("🚀 ~ file: payment.service.ts:80 ~ PaymentService ~ payOrder ~ error:", error)
      throw new BadRequestException({
        message: error,
      });
      // throw new Error(error);
    }
  }
  async MintCoin(createPaymentDto: CreatePaymentDto) {
    const detail = await this.payOrder(createPaymentDto);
      if (detail.status !== 'COMPLETED') {
        throw new BadRequestException({
          message: 'transaccion no se completo',
        });
      }
    try {      
      const isTransactionDuplicate = await this.transactionModel.find({idTransactionPaypal:createPaymentDto.transactionId});
      console.log("🚀 ~ file: payment.service.ts:95 ~ PaymentService ~ MintCoin ~ isTransactionDuplicate:", isTransactionDuplicate)
      if(isTransactionDuplicate.length!==0){
         throw new BadRequestException({
          message: 'id de transaccion duplicado',
        });
      }
      const response:IMintCoin = await this.contractService.mint(1,createPaymentDto.quantity,createPaymentDto.dni,createPaymentDto.email,createPaymentDto.firstName,createPaymentDto.lastName);
      if(response.status!=="sent"){
        throw new BadRequestException({
          message: 'No se pudo mintear bien',
        });
      }
      const transactionInfo:CreateTransactionDto= {
        tx: response.hash,
        email: createPaymentDto.email,
        dni: createPaymentDto.dni,
        fullName: `${createPaymentDto.firstName} ${createPaymentDto.lastName}`,
        idTransactionPaypal: detail.id,
        quantity:createPaymentDto.quantity
      }
      const transaction = await this.transactionModel.create(transactionInfo);
      return transaction;
    } catch (error) {
      throw new BadRequestException({
        message: 'id de transaccion duplicado',
      });
      
      
    }
  }
 async generateAccessToken()  {
  const paypalBearerToken = await this.getPaypalBearerToken();
  const requestConfig: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${paypalBearerToken}`,
      "Accept-Language": "en_US",
      "Content-Type": "application/json",
    },
  };
  try {
    const responseData = await lastValueFrom(
      this.http.post(process.env.PAYPAL_GENERATE_TOKEN,{}, requestConfig).pipe(
        map((response) => {
          console.log("🚀 ~ file: payment.service.ts:139 ~ PaymentService ~ map ~ response:", response)
          return response.data;
        }),
      ),
    );
    return responseData;
  } catch (error) {
    console.log("🚀 ~ file: payment.service.ts:47 ~ PaymentService ~ getPaypalBearerToken ~ error:", error)
    throw new BadRequestException({
      message:error
    });
  }
    
 }
}
