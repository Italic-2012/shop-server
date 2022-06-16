import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AdminModule } from './module/admin/admin.module';
import { DefaultModule } from './module/default/default.module';
import { ApiModule } from './module/api/api.module';
// admin权限校验中间件
import { AdminAuthMiddleware } from './middleware/admin-auth.middleware';
// mongodb
import { MongooseModule } from '@nestjs/mongoose';
import { InitMiddleware } from './middleware/init.middleware';

@Module({
  imports: [
    AdminModule,
    DefaultModule,
    ApiModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27018/xiaomi', {
      useNewUrlParser: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AdminAuthMiddleware)
      .forRoutes('admin/*')
      .apply(InitMiddleware)
      .forRoutes('*');
  }
}
