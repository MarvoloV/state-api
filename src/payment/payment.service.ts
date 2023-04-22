import { BadRequestException, Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { lastValueFrom, map } from 'rxjs';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class PaymentService {
  constructor(private http: HttpService) {}
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
      throw error;
    }
  }
  async payOrder(createPaymentDto:CreatePaymentDto) {
    const paypalBearerToken = await this.getPaypalBearerToken();
    if (!paypalBearerToken) {
      throw new BadRequestException({
        message: 'No se pudo confirmar el token de paypal',
      });
    }
    try {
      const requestConfig: AxiosRequestConfig = {
        headers: {
          'Authorization': `Bearer ${paypalBearerToken}`
      }
      };
      const responseData = await lastValueFrom(
        this.http.get(`${process.env.PAYPAL_ORDERS_URL}/${createPaymentDto.transactionId}`, requestConfig).pipe(
          map((response) => {
            return response.data;
          }),
        ),
      );
      return responseData;
    } catch (error) {
      console.log("🚀 ~ file: payment.service.ts:65 ~ PaymentService ~ payOrder ~ error:", error)
      // throw new Error(error);
      
    }

  }
}
