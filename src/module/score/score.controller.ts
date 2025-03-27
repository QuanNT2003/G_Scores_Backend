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
// import { ScoreDto } from 'src/dto/score.dto';

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

  @Get('/report/top_group_a')
  async getTop10GroupA(): Promise<ResponseData<object[]>> {
    // console.log('Đã vào controller getTop10KhoiA');
    try {
      const topScores = await this.scoreService.getTop10GroupA();
      // console.log('Kết quả trả về:', topScores);

      return new ResponseData<object[]>(
        topScores,
        HttpStatusCode.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      console.error('Lỗi controller:', error);
      return new ResponseData<object[]>(
        null,
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

  @Get('/report/:subject')
  async getReportScore(
    @Param('subject') subject: string,
  ): Promise<ResponseData<object>> {
    try {
      const score = await this.scoreService.getReportSubject(subject);
      return new ResponseData<object>(
        score,
        HttpStatusCode.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<object>(
        false,
        HttpStatusCode.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
}
