import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Transaction extends Document {
  @Prop({
    unique: true,
  })
  tx: string;
  @Prop()
  email: string;
  @Prop()
  dni: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);