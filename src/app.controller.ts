import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService, PathService } from './app.service';
// import { CreateGatewayDto } from './dto/create-gateway.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post()
  postHello(): string {
    return this.appService.postHello();
  }

  @Get('nowtime')
  getNowTime(): string {
    return this.appService.getNowTime();
  }
}

@Controller('jongway')
export class PathController {
  constructor(private readonly PathService: PathService) {}

  @Post('post')
  jongWay(@Body() CreateGatewayDto):object {
    return this.PathService.jongWay(CreateGatewayDto);
  }
}
