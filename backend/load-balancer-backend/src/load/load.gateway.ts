import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { RedisService } from '../services/redis.service';

@WebSocketGateway(3001, { cors: true })
export class LoadGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private readonly redisService: RedisService) {}

  async handleConnection(client: any, ...args: any[]) {
    const redisClient = this.redisService.client;
    const servers = ['server1', 'server2', 'server3'];

    setInterval(async () => {
      const loadData = [];

      for (const server of servers) {
        let count = await redisClient.get(server);
        if (!count) {
          await redisClient.set(server, '0');
          count = '0';
        }
        loadData.push(Number(count));
      }

      this.server.emit('loadData', loadData);
    }, 1000);
  }
}
