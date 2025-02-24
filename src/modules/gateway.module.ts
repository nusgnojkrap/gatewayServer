import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { GatewayController } from '.././controllers/gateway.controller';
import { GatewayService } from '.././services/gateway.service';

import { Messages } from 'src/entitys/messages.entity';
import { messageRepository } from 'src/repositorys/message.repository';

import { message_request_paramRepository } from 'src/repositorys/message_request_param.repository';
import { MessageRequestParam } from 'src/entitys/message_request_param.entity';

import { message_response_paramRepository } from 'src/repositorys/message_response_param.repository';
import { MessageResponseParam } from 'src/entitys/message_response_param.entity';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // .env 파일 자동 로드
    TypeOrmModule.forRoot({
      type: 'mysql', // 데이터베이스 종류 (예: MySQL)
      host: '127.0.0.1', // 데이터베이스 호스트
      port: 3306, // 포트
      username: 'root', // 사용자 이름
      password: 'vkvkdltm', // 비밀번호
      database: 'gateway', // 데이터베이스 이름
      entities: [Messages, MessageRequestParam], // 엔티티 배열
      synchronize: false, // 데이터베이스 자동 동기화 (개발 환경에서만 사용)
    }),
    TypeOrmModule.forFeature([Messages, MessageRequestParam, MessageResponseParam]),
  ],
  controllers: [ GatewayController],
  providers: [ GatewayService, messageRepository, message_request_paramRepository, message_response_paramRepository],
})

export class GatewayModule {}
