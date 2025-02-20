import { Module } from '@nestjs/common';
import { AppController, PathController } from './app.controller';
import { AppService, PathService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './utils/mysqlConn';

@Module({
  imports: [    
    ConfigModule.forRoot({ isGlobal: true }), // .env 파일 자동 로드
    DatabaseModule
  ],
  controllers: [AppController, PathController],
  providers: [AppService, PathService],
})
export class AppModule {}
