import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Order extends Document {
  @Prop({ unique: true })
  orderId: string;
  @Prop()
  quantity:number;
  @Prop()
  isComplete:boolean;
  @Prop()
  isWallet:boolean
}


export const OrderSchema = SchemaFactory.createForClass(Order);