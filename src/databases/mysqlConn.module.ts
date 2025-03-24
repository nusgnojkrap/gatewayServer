import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule, // 환경 변수 사용을 위해 ConfigModule 추가
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get<string>('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get<string>('DB_USER'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_NAME'),
                autoLoadEntities: true, // 엔티티 자동 로드
                synchronize: false, // 운영에서는 false 유지
            }),
        }),
    ],
    exports: [TypeOrmModule], // 다른 모듈에서 사용 가능하도록 내보내기
})
export class MysqlConnModule {}