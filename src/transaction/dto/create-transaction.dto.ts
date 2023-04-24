import {
  IsEmail,
  IsInt,
  IsNumber,
  isNumber,
  IsPositive,
  isString,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  tx: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsNumber()
  @IsPositive()
  @Min(10000000, { message: 'longitud minima es de 8 digitos' })
  @Max(99999999, { message: 'longitud maxima es de 8 digitos' })
  dni: number;
  @MinLength(1)
  @IsString()
  fullName:string;
  @IsString()
  idTransactionPaypal:string;
  @IsNumber()
  @IsPositive()
  quantity:number;
}
