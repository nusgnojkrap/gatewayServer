// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class CacheRepository {
//     private readonly CACHE_TTL = 3600; // 1시간 (초 단위)

//     constructor() { }

//     // 🔹 Redis에서 캐시 조회
//     async getCache<T>(key: string): Promise<T | null> {
//         return this.redisService.get<T>(key);
//     }

//     // 🔹 Redis에 캐시 저장
//     async setCache<T>(key: string, value: T, ttl: number = this.CACHE_TTL): Promise<void> {
//         await this.redisService.set(key, value, ttl);
//     }

//     // 🔹 Redis 캐시 삭제
//     async deleteCache(key: string): Promise<void> {
//         await this.redisService.del(key);
//     }
// }
