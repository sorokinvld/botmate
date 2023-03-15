import { Module, Global } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { SocketService } from './socket.service';

@Global()
@Module({
  controllers: [],
  providers: [SocketService, SocketGateway],
  exports: [SocketService],
})
export class SocketModule {}
