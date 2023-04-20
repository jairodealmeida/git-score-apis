import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ICommit } from './commit.entity';
import { CommitService } from './commit.service';
import { CreateCommitDto } from './create-commit.dto';
import { UpdateCommitDto } from './update-commit.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiProperty,
} from '@nestjs/swagger';

class CommitRequest {
  @ApiProperty({ default: 'jairodealmeida' })
  author: string;

  @ApiProperty({ default: '/home/jdealmeida/Projetos/git-score-apis' })
  url: string;
}

@ApiTags('commits')
@Controller('commits')
export class CommitController {
  constructor(private readonly commitService: CommitService) {}

  @ApiOperation({ summary: 'Get commits by author' })
  @ApiResponse({
    status: 200,
    description: 'Returns an array of commit objects',
  })
  @Post()
  getCommitsByAuthor(@Body() body: CommitRequest): Promise<ICommit[]> {
    const author = body.author;
    const url = body.url;
    const commits = this.commitService.getCommitsByAuthor(author, url);
    return commits;
  }
}
