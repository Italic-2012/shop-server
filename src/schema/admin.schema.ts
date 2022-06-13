/**
 * Author:hong.rong
 * Desc:用户
 * Date:2022-06-14
 */

import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const AdminSchema = new mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  mobile: {
    type: String
  },
  email: {
    type: String
  },
  status: {
    type: Number,
    default: 1
  },
  role_id: {
    type: Schema.Types.ObjectId
  },
  add_time: {
    type: Number,
    default: Date.now()
  },
  is_super: {
    type: Number
  }
});
