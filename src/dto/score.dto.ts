import { IsNotEmpty, MinLength } from 'class-validator';

export class ScoreDto {
  @IsNotEmpty()
  sbd: number;

  toan: number;

  ngu_van: number;

  ngoai_ngu: number;

  vat_li: number;

  hoa_hoc: number;

  sinh_hoc: number;

  lich_su: number;

  dia_li: number;

  gdcd: number;

  ma_ngoai_ngu: string;
}
