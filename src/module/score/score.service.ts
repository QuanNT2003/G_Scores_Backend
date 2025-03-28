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

    const countF6T8 = await this.scoreModel
      .countDocuments({
        [subject]: { $gt: 6, $lt: 8 },
      })
      .exec();

    const countF4T6 = await this.scoreModel
      .countDocuments({
        [subject]: { $gt: 4, $lt: 6 },
      })
      .exec();

    const countLT4 = await this.scoreModel
      .countDocuments({ [subject]: { $lt: 8 } })
      .exec();

    return {
      labels: ['Greater than 8', 'From 6 to 8', 'From 4 to 6', 'Less than 4'],
      values: [countGT8, countF6T8, countF4T6, countLT4],
    };
  }

  async getGreaterThan5(subject: string) {
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

    const countGT5 = await this.scoreModel
      .countDocuments({ [subject]: { $gt: 5 } })
      .exec();

    const numberTest = await this.scoreModel
      .countDocuments({ [subject]: { $ne: null } })
      .exec();
    return {
      subject: subject,
      number: countGT5,
      numberTest: numberTest,
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

  async getExamType() {
    try {
      const naturalScienceExam = await this.scoreModel
        .countDocuments({
          $and: [
            { vat_li: { $ne: null } },
            { hoa_hoc: { $ne: null } },
            { sinh_hoc: { $ne: null } },
          ],
        })
        .exec();
      const socialScienceExam = await this.scoreModel
        .countDocuments({
          $and: [
            { lich_su: { $ne: null } },
            { dia_li: { $ne: null } },
            { gdcd: { $ne: null } },
          ],
        })
        .exec();

      return {
        naturalScienceExam: naturalScienceExam,
        socialScienceExam: socialScienceExam,
      };
    } catch (error) {
      console.error('Lỗi service:', error);
      throw new Error('Lỗi khi lấy danh sách top 10 khối A');
    }
  }
}
