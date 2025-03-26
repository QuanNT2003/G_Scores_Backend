import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatusCode } from 'src/global/globalEnum';
import { ScoreServices } from './score.service';
import { Score } from 'src/models/score.model';
import { ScoreDto } from 'src/dto/score.dto';

@Controller('scores')
export class ScoreController {
  constructor(private readonly scoreService: ScoreServices) {}
  @Get()
  async getScore(): Promise<ResponseData<Score[]>> {
    try {
      const scores = await this.scoreService.getScore();
      return new ResponseData<Score[]>(
        scores,
        HttpStatusCode.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Score[]>(
        false,
        HttpStatusCode.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Get('/:id')
  async getDetailtScore(@Param('id') id: string): Promise<ResponseData<Score>> {
    try {
      const score = await this.scoreService.getDetailtScore(id);
      return new ResponseData<Score>(
        score,
        HttpStatusCode.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Score>(
        false,
        HttpStatusCode.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Post()
  async createScore(
    @Body(new ValidationPipe()) scoreDto: ScoreDto,
  ): Promise<ResponseData<Score>> {
    try {
      const score = await this.scoreService.createScore(scoreDto);
      return new ResponseData<Score>(
        score,
        HttpStatusCode.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Score>(
        false,
        HttpStatusCode.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
}
