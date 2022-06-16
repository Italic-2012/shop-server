/**
 * Author:hong.rong
 * Desc:
 * Date:2022-06-12
 */

/**
 * admin路由白名单
 */
const ADMIN_ROUTER_WHITE_LIST = ['/admin/login', '/admin/login/code'];

const Config = {
  // 后台路由前缀
  adminPath: 'admin',

  /**
   * session过期时间
   */
  sessionMaxAge: 30 * 1000 * 60,
};

export { ADMIN_ROUTER_WHITE_LIST, Config };
