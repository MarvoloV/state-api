import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({timestamps:true})
export class Order extends Document {
  @Prop({ unique: true })
  orderId: string;
  @Prop()
  quantity:number;
  @Prop()
  isComplete:boolean;
  @Prop()
  isWallet:boolean;
  @Prop()
  tokenId:number;
}


export const OrderSchema = SchemaFactory.createForClass(Order);