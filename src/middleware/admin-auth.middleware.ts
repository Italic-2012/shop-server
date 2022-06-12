import { Injectable, NestMiddleware } from '@nestjs/common';
import { ADMIN_ROUTER_WHITE_LIST } from "../config/config";

@Injectable()
export class AdminAuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // 从session中获取用户登录态
    const userInfo = req.session.userInfo
    if (userInfo && userInfo.username) {
      next();
    } else {
      if (ADMIN_ROUTER_WHITE_LIST.includes(req.baseUrl)) {
        next();
      } else {
        res.redirect('/admin/login');
      }
    }
  }
}
