import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './rest/user/user.module';
import { CommitModule } from './rest/commit/commit.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      //type: 'mongodb',
      //url: 'mongodb+srv://<admin>:<password>@chnirt-graphql-apollo-vg0hq.mongodb.net/nest?retryWrites=true&w=majority',
      //url: 'mongodb://127.0.0.1:27017/git-score-db',
      //entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      //synchronize: true,
      //useNewUrlParser: true,
      //logging: true,

      type: 'mongodb',

      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.DB_SYNCHRONIZE === 'true',

      logging: true,
    }),
    UserModule,
    CommitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
