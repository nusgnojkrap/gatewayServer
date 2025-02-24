import { Module } from '@nestjs/common';

import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';

import { GatewayModule } from './modules/gateway.module';

@Module({
  imports: [    
    GatewayModule
  ],
  
  // 아래는 App (기본 구조)
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
