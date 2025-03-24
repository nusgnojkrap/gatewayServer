// src/utils/redis.util.ts
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();
const redisClient = new Redis({
  host: configService.get<string>('REDIS_HOST'),
  port: configService.get<number>('REDIS_PORT'),
});

// 오류 감지
redisClient.on('error', (err) => {
  console.error('Redis 연결 오류:', err);
});

// ✅ 데이터를 저장하는 함수
export const setRedis = async (key: string, value: string, ttl?: number): Promise<void> => {
  if (ttl) {
    await redisClient.set(key, value, 'EX', ttl);
  } else {
    await redisClient.set(key, value);
  }
};

// ✅ 데이터를 조회하는 함수
export const getRedis = async (key: string): Promise<string | null> => {
  return await redisClient.get(key);
};

// ✅ 데이터를 삭제하는 함수
export const delRedis = async (key: string): Promise<void> => {
  await redisClient.del(key);
};
