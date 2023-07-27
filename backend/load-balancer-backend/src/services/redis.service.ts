import { Injectable } from '@nestjs/common';
import { default as Redis } from 'ioredis';

@Injectable()
export class RedisService {
  public client: Redis;

  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
    });
  }
}
