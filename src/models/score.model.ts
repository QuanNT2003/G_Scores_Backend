import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Score {
  @Prop({ required: true })
  sbd: number;

  toan?: number;

  ngu_van?: number;

  ngoai_ngu?: number;

  vat_li?: number;

  hoa_hoc?: number;

  sinh_hoc?: number;

  lich_su?: number;

  dia_li?: number;

  gdcd?: number;

  ma_ngoai_ngu?: string;
}

export const ScoreScheme = SchemaFactory.createForClass(Score);
