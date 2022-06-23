import { Controller, Get, Render } from '@nestjs/common';
import { RoleService } from 'src/service/role/role.service';

@Controller('admin/role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  // @Render('admin/role/index')
  async index() {
    const result = await this.roleService.find();
    console.log(result);
    return result;
  }
}
