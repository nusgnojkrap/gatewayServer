import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { GatewayController } from '.././controllers/gateway.controller';
import { GatewayService } from '.././services/gateway.service';

// import { RedisService } from 'src/services/redis.service';

import { Messages } from 'src/entitys/messages.entity';
import { messageRepository } from 'src/repositorys/message.repository';

import { message_request_paramRepository } from 'src/repositorys/message_request_param.repository';
import { MessageRequestParam } from 'src/entitys/message_request_param.entity';

import { message_response_paramRepository } from 'src/repositorys/message_response_param.repository';
import { MessageResponseParam } from 'src/entitys/message_response_param.entity';
import { MysqlConnModule } from 'src/databases/mysqlConn.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }), // .env 파일 자동 로드
        MysqlConnModule, // 💡 새롭게 만든 MySQL 연결 모듈 추가
        TypeOrmModule.forFeature([Messages, MessageRequestParam, MessageResponseParam]),
    ],
    controllers: [GatewayController],
    providers: [GatewayService, messageRepository, message_request_paramRepository, message_response_paramRepository],
})

export class GatewayModule { }