import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class AdminService {
  constructor(@InjectModel('Admin') private adminModel) {}

  /**
   * 查询
   * @param params
   */
  async find(params = {}) {
    return await this.adminModel.find(params);
  }
}
