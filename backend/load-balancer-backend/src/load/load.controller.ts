import { Controller, Get, Param, Post } from '@nestjs/common';
import { RedisService } from '../services/redis.service';

@Controller('load')
export class LoadController {
  constructor(private redisService: RedisService) {}

  @Get()
  async getLoad() {
    const loads = {};

    for (let i = 1; i <= 3; i++) {
      const load = await this.redisService.client.get(`server${i}`);

      loads[`server${i}`] = load;
    }
    return loads;
  }

  // @Get(':serverNumber')
  // async getLoad(@Param('serverNumber') serverNumber: string) {
  //   const load = await this.redisService.client.get(`server${serverNumber}`);
  //   return `Load of server${serverNumber}: ${load}`;
  // }

  // @Post(':serverNumber')
  // async incrementLoad(@Param('serverNumber') serverNumber: string) {
  //   await this.redisService.client.incr(`server${serverNumber}`);
  //   return `Load of server${serverNumber} incremented`;
  // }
}
