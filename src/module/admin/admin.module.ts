import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// controller
import { MainController } from './main/main.controller';
import { LoginController } from './login/login.controller';
import { ManagerController } from './manager/manager.controller';
import { RoleController } from './role/role.controller';
// sevice
import { ToolsService } from '../../service/tools/tools.service';
import { AdminService } from '../../service/admin/admin.service';
import { RoleService } from '../../service/role/role.service';
// schema
import { AdminSchema } from '../../schema/admin.schema';
import { RoleSchema } from '../../schema/role.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Admin', schema: AdminSchema, collection: 'admin' },
      { name: 'Role', schema: RoleSchema, collection: 'role' },
    ]),
  ],
  controllers: [
    MainController,
    LoginController,
    ManagerController,
    RoleController,
  ],
  providers: [ToolsService, AdminService, RoleService],
})
export class AdminModule {}
