import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AdminModule } from './module/admin/admin.module';
import { DefaultModule } from './module/default/default.module';
import { ApiModule } from './module/api/api.module';
// admin权限校验中间件
import { AdminAuthMiddleware } from "./middleware/admin-auth.middleware";

@Module({
  imports: [AdminModule, DefaultModule, ApiModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AdminAuthMiddleware).forRoutes('admin/*');
  }
}
