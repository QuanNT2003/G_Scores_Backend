import { Module } from '@nestjs/common';
import { ScoreController } from './score.controller';
import { ScoreServices } from './score.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Score, ScoreScheme } from 'src/models/score.model';

@Module({
  controllers: [ScoreController],
  providers: [ScoreServices],
  imports: [
    MongooseModule.forFeature([
      {
        name: Score.name,
        schema: ScoreScheme,
      },
    ]),
  ],
})
export class ScoreModule {}
