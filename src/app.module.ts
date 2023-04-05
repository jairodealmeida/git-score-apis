import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './api/user/user.entity';
import { UserRepository } from './api/user/user.repository';
//import { UserRepository } from './api/user/user.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'mydatabase',
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
