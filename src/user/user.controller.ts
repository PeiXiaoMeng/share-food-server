

import { Controller, Get, Post, Body, Headers, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from '../app.service';
import { UserService } from './user.service';
@Controller()
export class UserController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Get('test22')
  getHello(): string {
    return 'ceshi';
  }

  @Post('user')
  registry(@Body() userdto, @Headers() headers) {
    return this.userService.registry(userdto);
  }

  @Post('login')
  login(@Body() userdto, @Headers() headers) {
    return this.userService.login(userdto);
  }

}
