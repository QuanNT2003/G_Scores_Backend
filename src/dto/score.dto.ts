import { IsNotEmpty, MinLength } from 'class-validator';

export class ScoreDto {
  @IsNotEmpty()
  sbd: number;

  @IsNotEmpty()
  toan: number;

  @IsNotEmpty()
  ngu_van: number;

  @IsNotEmpty()
  ngoai_ngu: number;

  @IsNotEmpty()
  vat_li: number;

  @IsNotEmpty()
  hoa_hoc: number;

  @IsNotEmpty()
  sinh_hoc: number;

  @IsNotEmpty()
  ma_ngoai_ngu: string;
}
