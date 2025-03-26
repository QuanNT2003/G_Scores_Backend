import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ScoreModule } from './module/score/score.module';

@Module({
  imports: [ScoreModule, MongooseModule.forRoot(process.env.MongoURL)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
