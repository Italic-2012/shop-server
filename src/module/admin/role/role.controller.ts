import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Render,
  Response,
} from '@nestjs/common';
import { RoleService } from 'src/service/role/role.service';
import { ToolsService } from 'src/service/tools/tools.service';

@Controller('admin/role')
export class RoleController {
  constructor(
    private roleService: RoleService,
    private toolService: ToolsService,
  ) {}

  /**
   * 渲染列表页面
   * @returns
   */
  @Get()
  @Render('admin/role/index')
  async index() {
    const result = await this.roleService.find();
    return {
      result: result,
    };
  }

  /**
   * 渲染新增页面
   * @returns
   */
  @Get('add')
  @Render('admin/role/add')
  async addPage() {
    return {};
  }

  @Post('add')
  async add(@Body() body, @Response() res) {
    if (body.title && body.description) {
      const result = await this.roleService.add(body);
      if (result) {
        res.redirect('/admin/role');
      } else {
        this.toolService.error(res, {
          message: '新增角色失败',
          redirectUrl: '/admin/role',
        });
      }
    } else {
      this.toolService.error(res, {
        message: '标题不能为空',
        redirectUrl: '/admin/role',
      });
    }
  }

  /**
   * 渲染编辑页面
   * @returns
   */
  @Get('edit')
  @Render('admin/role/edit')
  async editPage(@Query() query) {
    if (query.id) {
      const result = await this.roleService.find({ _id: query.id });
      return {
        result: result[0] || {},
      };
    }
    return {};
  }

  @Post('edit')
  async edit(@Body() body, @Response() res) {
    const { _id, ...restBody } = body;
    const result = await this.roleService.updateOne({ _id }, restBody);
    if (result) {
      res.redirect('/admin/role');
    } else {
      this.toolService.error(res, {
        message: '修改角色失败',
        redirectUrl: '/admin/role',
      });
    }
  }

  @Get('remove')
  async remove(@Query() query, @Response() res) {
    console.log(query, 'query');
    if (query.id) {
      const result = await this.roleService.deleteOne({ _id: query.id });
      if (result) {
        res.redirect('/admin/role');
      } else {
        this.toolService.error(res, {
          message: '删除角色失败',
          redirectUrl: '/admin/role',
        });
      }
    }
    return {};
  }
}
