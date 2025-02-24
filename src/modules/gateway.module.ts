import { Module } from '@nestjs/common';

import { GatewayController } from '.././controllers/gateway.controller';

import { GatewayService } from '.././services/gateway.service';

import { ConfigModule } from '@nestjs/config';
import { mysqlConn } from '../databases/mysqlConn';

@Module({
  imports: [    
    ConfigModule.forRoot({ isGlobal: true }), // .env 파일 자동 로드
    mysqlConn
  ],
  controllers: [ GatewayController],
  providers: [ GatewayService],
})
export class GatewayModule {}
