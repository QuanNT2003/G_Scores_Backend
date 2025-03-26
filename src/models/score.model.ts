import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Score {
  @Prop({ required: true })
  sbd: number;

  @Prop({ required: true })
  toan: number;

  @Prop({ required: true })
  ngu_van: number;

  @Prop({ required: true })
  ngoai_ngu: number;

  @Prop({ required: true })
  vat_li: number;

  @Prop({ required: true })
  hoa_hoc: number;

  @Prop({ required: true })
  sinh_hoc: number;

  @Prop({ required: true })
  ma_ngoai_ngu: string;
}

export const ScoreScheme = SchemaFactory.createForClass(Score);
