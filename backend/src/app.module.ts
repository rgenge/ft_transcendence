import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PongGateway } from './pong/pong.gateway';
import { LobbyGateway } from './lobby/lobby.gateway';
import { LobbyModule } from './lobby/lobby.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [UserModule, AuthModule, LobbyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
