import { Module } from '@nestjs/common';
import { AppController, PathController } from './app.controller';
import { AppService, PathService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, PathController],
  providers: [AppService, PathService],
})
export class AppModule {}
