import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { RedisService } from '../services/redis.service';

@Injectable()
export class CountMiddleware implements NestMiddleware {
  private serverIndex = 0;
  private servers = ['server1', 'server2', 'server3'];

  constructor(private redisService: RedisService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const server = this.servers[this.serverIndex];
    this.serverIndex = (this.serverIndex + 1) % this.servers.length;

    this.redisService.client.incr(server, (err, result) => {
      if (err) {
        console.error('Redis error: ', err);
      } else {
        console.log(`Server: ${server}, count: ${result}`);
      }
    });

    next();
  }
}
