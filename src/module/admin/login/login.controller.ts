import { Controller, Get, Render, Request, Response } from '@nestjs/common';
import { ToolsService } from "../../../service/tools/tools.service";

@Controller('admin/login')
export class LoginController {
  constructor(private toolsService: ToolsService) {}

  @Get()
  @Render('admin/login')
  index() {
    return {};
  }

  /**
   * 验证码接口
   * @param req
   * @param res
   */
  @Get('code')
  getCode(@Request() req, @Response() res) {
    const svgCaptcha = this.toolsService.generateCaptcha();
    // 设置session
    req.session.code = svgCaptcha.text;
    // 设置类型返回类型
    res.type('image/svg+xml');
    res.send(svgCaptcha.data);
  }

}
