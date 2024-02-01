

import { Controller, Get, Post, Body, Headers, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from '../app.service';
import { FieldService } from './field.service';
@Controller()
export class FieldController {
  constructor(
    private readonly appService: AppService,
    private readonly fieldService: FieldService,
  ) {}

  // @UseGuards(AuthGuard('jwt'))
  @Get('field')
  field() {
    return this.fieldService.field();
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get('field/:id')
  async getbyId(@Req() request: any) {
    return this.fieldService.getById(request.params.id);
  }

  @Post('field')
  async create(@Body() fieldDTO) {
    return this.fieldService.create(fieldDTO);
  }

  @Post('field/:id')
  async update(@Body() fieldDTO) {
    return this.fieldService.update(fieldDTO);
  }
}
