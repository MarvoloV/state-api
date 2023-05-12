import { IsEmail, IsNumber, IsPositive, IsString, Max, Min } from "class-validator";

export class CreatePaymentDto {
  @IsString()
  transactionId:string;
  @IsString()
  firstName:string;
  @IsString()
  lastName:string;
  @IsNumber()
  @IsPositive()
  @Min(10000000, { message: 'longitud minima es de 8 digitos' })
  @Max(99999999, { message: 'longitud maxima es de 8 digitos' })
  dni: number;
  @IsEmail()
  email:string;
  @IsNumber()
  @IsPositive()
  quantity:number;
  @IsNumber()
  tokenId:number;
}
