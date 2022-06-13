import { Injectable, Response } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';
import * as md5 from 'md5';

@Injectable()
export class ToolsService {
  /**
   * 生成验证码
   */
  generateCaptcha() {
    return svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 34,
      background: '#cc9966',
    });
  }
  /**
   * 转换md5
   * @param value z
   * @returns
   */
  getMd5(value: string) {
    return md5(value);
  }
  /**
   * 跳转错误页面
   * @param res
   * @param data
   */
  async error(res: any, data: { message: string; redirectUrl: string }) {
    await res.render('admin/public/error', data);
  }
}
