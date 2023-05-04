import {
  IsEmail,
  IsInt,
  IsNumber,
  isNumber,
  IsOptional,
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
  // @Min(1, { message: 'longitud minima es de 8 digitos' })
  @Max(99999999, { message: 'longitud maxima es de 8 digitos' })
  dni: number;
  @MinLength(1)
  @IsString()
  fullName:string;
  @IsNumber()
  @IsPositive()
  quantity:number;
  @IsString()
  idTransactionPaypal?:string;
}
