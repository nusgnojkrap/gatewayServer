import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { GatewayService } from '../services/gateway.service';

@Controller('gateway')
export class GatewayController {
    constructor(private readonly PathService: GatewayService) { }

    @Post('')
    PostGateWay(@Body() CreateGatewayDto): object {
        return this.PathService.PostGateWay(CreateGatewayDto);
    }

    @Get('deletecache/:messageName')
    deleteCache(@Param('messageName') messageName: string): object {
        return this.PathService.deleteCache(messageName);
    }

    @Patch('')
    PatchGateWay(@Body() CreateGatewayDto): object {
        return this.PathService.PatchGateWay(CreateGatewayDto);
    }

}
