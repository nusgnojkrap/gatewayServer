import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from '../services/app.service';

// 테스트 코드
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('nowtime')
  getNowTime(): string {
    return this.appService.getNowTime();
  }

  @Get('list')
  getlist(): Array<string> {
    return this.appService.getlist();
  }

  @Post()
  postHello(): string {
    return this.appService.postHello();
  }

}
