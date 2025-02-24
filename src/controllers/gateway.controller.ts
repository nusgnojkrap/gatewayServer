import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { GatewayService } from '../services/gateway.service';

@Controller('gateway')
export class GatewayController {
  constructor(private readonly PathService: GatewayService) {}

  @Post('')
  PostGateWay(@Body() CreateGatewayDto):object {
    return this.PathService.PostGateWay(CreateGatewayDto);
  }

  @Get('')
  GetgateWay(@Body() CreateGatewayDto):object {
    return this.PathService.GetGateWay(CreateGatewayDto);
  }

  @Patch('')
  PatchGateWay(@Body() CreateGatewayDto):object {
    return this.PathService.PatchGateWay(CreateGatewayDto);
  }

}
