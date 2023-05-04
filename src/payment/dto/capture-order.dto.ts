import {  IsString } from "class-validator";

export class CaptureOrderDto {
  @IsString()
  orderId:string;
}
