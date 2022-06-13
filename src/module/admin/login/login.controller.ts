import {
  Controller,
  Get,
  Render,
  Request,
  Response,
  Post,
  Body,
} from '@nestjs/common';
import { ToolsService } from '../../../service/tools/tools.service';
import { AdminService } from '../../../service/admin/admin.service';

@Controller('admin')
export class LoginController {
  constructor(
    private toolsService: ToolsService,
    private adminService: AdminService,
  ) {}

  /**
   * 渲染登录页面
   * @returns
   */
  @Get('login')
  @Render('admin/login')
  async index() {
    return {};
  }
  /**
   * 登录
   * @param body
   * @param req
   * @param res
   * @returns
   */
  @Post('login')
  async doLogin(@Body() body, @Request() req, @Response() res) {
    const username: string = body.username;
    const password: string = body.password || '';
    const code: string = body.code || '';
    try {
      if (!username || password.length < 6) {
        await this.toolsService.error(res, {
          message: '用户名或密码不正确',
          redirectUrl: '/admin/login',
        });
      } else {
        const sessionCode: string = req.session.code || '';
        if (code.toLowerCase() === sessionCode.toLowerCase()) {
          // 查询数据库中用户是否存在
          const result = await this.adminService.find({
            password: this.toolsService.getMd5(password),
            username,
          });
          if (result.length > 0) {
            const userInfo = result[0] || {};
            // session设置用户信息，跳过中间件验证
            req.session.userInfo = {
              id: userInfo._id,
              username: userInfo.username,
              status: userInfo.status,
              add_time: userInfo.add_time,
            };
            res.redirect('/admin/main');
          } else {
            await this.toolsService.error(res, {
              message: '用户名或密码不正确',
              redirectUrl: '/admin/login',
            });
          }
        } else {
          // console.log('验证码不正确');
          // res.redirect('/admin/login');
          await this.toolsService.error(res, {
            message: '验证码不正确',
            redirectUrl: '/admin/login',
          });
        }
      }
    } catch (e) {
      await this.toolsService.error(res, {
        message: `${e}`,
        redirectUrl: '/admin/login',
      });
    }
    return {};
  }

  /**
   * 验证码接口
   * @param req
   * @param res
   */
  @Get('login/code')
  getCode(@Request() req, @Response() res) {
    const svgCaptcha = this.toolsService.generateCaptcha();
    // 设置session
    req.session.code = svgCaptcha.text;
    // 设置类型返回类型
    res.type('image/svg+xml');
    res.send(svgCaptcha.data);
  }

  /**
   * 退出登录
   * @param req
   * @param res
   */
  @Get('loginOut')
  loginOut(@Request() req, @Response() res) {
    req.session.userInfo = null;
    res.redirect('/admin/login');
  }
}
