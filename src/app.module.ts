import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './api/user/user.controller';
import { CommitController } from './api/commit/commit.controllers';
import { UserService } from './api/user/user.service';
import { CommitService } from './api/commit/commit.services';

@Module({
  imports: [],
  controllers: [AppController, UserController, CommitController],
  providers: [UserService, CommitService],
})
export class AppModule {}
