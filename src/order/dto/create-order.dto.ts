import { IsBoolean, IsNumber, IsPositive, IsString, IsUUID } from "class-validator";

export class CreateOrderDto {
  @IsUUID(4)
  orderId: string;
  @IsNumber()
  @IsPositive()
  quantity:number;
  @IsBoolean()
  isComplete:boolean
  @IsBoolean()
  isWallet:boolean
}
