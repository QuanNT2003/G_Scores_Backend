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
    const score = await this.scoreModel.findOne({ sbd: sbd }).exec();
    if (!score) {
      throw new Error(`User with id ${sbd} not found`);
    }
    //console.log(score);
    return score;
  }

  async getReportSubject(subject: string) {
    const validSubjects = [
      'toan',
      'ngu_van',
      'ngoai_ngu',
      'vat_li',
      'hoa_hoc',
      'sinh_hoc',
      'lich_su',
      'dia_li',
      'gdcd',
    ];

    if (!validSubjects.includes(subject)) {
      throw new Error(`Môn học ${subject} không hợp lệ`);
    }

    const countGT8 = await this.scoreModel
      .countDocuments({ [subject]: { $gt: 8 } })
      .exec();

    const countBW8And6 = await this.scoreModel
      .countDocuments({
        [subject]: { $gt: 6, $lt: 8 },
      })
      .exec();

    const countBW6And4 = await this.scoreModel
      .countDocuments({
        [subject]: { $gt: 4, $lt: 6 },
      })
      .exec();

    const countLT4 = await this.scoreModel
      .countDocuments({ [subject]: { $lt: 8 } })
      .exec();

    return {
      'Lớn hơn 8': countGT8,
      'Từ 6 đến 8': countBW8And6,
      'Từ 4 đến 6': countBW6And4,
      'Nhỏ hơn 4': countLT4,
    };
  }

  async getTop10GroupA() {
    try {
      const top10 = await this.scoreModel
        .aggregate([
          {
            $match: {
              toan: { $ne: null },
              vat_li: { $ne: null },
              hoa_hoc: { $ne: null },
            },
          },
          {
            $addFields: {
              tong_diem: { $sum: ['$toan', '$vat_li', '$hoa_hoc'] },
            },
          },
          {
            $sort: { tong_diem: -1 },
          },
          {
            $limit: 10,
          },
          {
            $project: {
              sbd: 1,
              toan: 1,
              vat_li: 1,
              hoa_hoc: 1,
              tong_diem: 1,
              _id: 0,
            },
          },
        ])
        .exec();

      return top10;
    } catch (error) {
      console.error('Lỗi service:', error);
      throw new Error('Lỗi khi lấy danh sách top 10 khối A');
    }
  }
}
