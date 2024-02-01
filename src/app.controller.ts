import { Controller, Get, Post, Body, Headers, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { FieldService } from './field/field.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    private readonly fieldService: FieldService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('user')
  getUser(): string {
    return this.userService.getUser();
  }

  @Get('condition')
  condition() {
    return this.fieldService.condition();
  }
}
