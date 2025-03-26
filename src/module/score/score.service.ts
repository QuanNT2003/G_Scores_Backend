import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Score } from 'src/models/score.model';
import { ScoreDto } from 'src/dto/score.dto';

@Injectable()
export class ScoreServices {
  constructor(@InjectModel(Score.name) private scoreModel: Model<Score>) {}

  getScore() {
    return this.scoreModel.find().limit(10).exec();
  }

  async getDetailtScore(sbd: string) {
    //console.log(sbd);
    const score = await this.scoreModel.find({ sbd: sbd }).exec();
    if (!score) {
      throw new Error(`User with id ${sbd} not found`);
    }
    //console.log(score);
    return score;
  }

  createScore(scoreDto: ScoreDto) {
    return this.scoreModel.create(scoreDto);
  }
}
