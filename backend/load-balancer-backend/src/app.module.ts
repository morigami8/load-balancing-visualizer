import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DelayMiddleware } from './delay/delay.middleware';
import { RedisService } from './services/redis.service';
import { CountMiddleware } from './count/count.middleware';
import { LoadController } from './load/load.controller';
import { LoadGateway } from './load/load.gateway';

@Module({
  imports: [],
  controllers: [AppController, LoadController],
  providers: [AppService, RedisService, LoadGateway],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DelayMiddleware, CountMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
