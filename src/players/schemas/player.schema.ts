import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Player {
  @Prop()
  id: number;

  @Prop()
  status: string;

  @Prop()
  nickname: string;

  @Prop()
  balance: number;

  @Prop()
  avatar: string;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
export type PlayerDocument = Player & Document;
