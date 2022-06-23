import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RoleInterface } from 'src/interface/role.interface';

@Injectable()
export class RoleService {
  constructor(@InjectModel('Role') private roleModel) {}

  /**
   * 查找
   * @param json
   * @param fields
   * @returns
   */
  async find(json: RoleInterface = {}, fields?: string) {
    try {
      return await this.roleModel.find(json, fields);
    } catch (error) {
      return null;
    }
  }

  /**
   * 新增
   * @param json
   * @returns
   */
  async add(json: RoleInterface = {}) {
    try {
      const role = new this.roleModel(json);
      const result = await role.save();
      return result;
    } catch (error) {
      return null;
    }
  }

  /**
   * 更新
   * @param json1
   * @param json2
   * @returns
   */
  async updateOne(json1: RoleInterface = {}, json2: RoleInterface = {}) {
    try {
      const result = await this.roleModel.updateOne(json1, json2);
      return result;
    } catch (error) {
      return null;
    }
  }

  /**
   * 删除
   * @param json
   * @returns
   */
  async deleteOne(json: RoleInterface = {}) {
    try {
      const result = await this.roleModel.deleteOne(json);
      return result;
    } catch (error) {
      return null;
    }
  }
}
