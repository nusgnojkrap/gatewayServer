import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';

import { GatewayModule } from './modules/gateway.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,  // 모든 모듈에서 환경 변수를 사용할 수 있도록 설정
          }),
        GatewayModule
    ],

    // 아래는 App (기본 구조)
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
