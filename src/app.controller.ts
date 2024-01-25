import { Controller, Get, Post, Body, Headers } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('user')
  getUser(): string {
    return this.userService.getUser();
  }

  @Post('user')
  registry(@Body() userdto, @Headers() headers) {
    return this.userService.registry(userdto);
  }
}
