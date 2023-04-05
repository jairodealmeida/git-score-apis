/*import { Module, RequestMethod } from '@nestjs/common';
import { RouterModule, Routes } from 'nest-router';
import { CommitController } from '../controllers/commit.controller';

const routes: Routes = [
  {
    path: '/commits',
    module: CommitModule,
    children: [
      {
        path: '',
        method: RequestMethod.GET,
        handler: 'getAllCommits',
      },
    ],
  },
];

@Module({
  imports: [RouterModule.forRoutes(routes)],
})
export class CommitRouter {}
*/

import { Module } from '@nestjs/common';
import { CommitController } from './commit.controllers';

@Module({
  controllers: [CommitController],
})
export class CommitModule {}
