import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
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

  @ApiProperty({
    default: 'https://github.com/jairodealmeida/git-score-apis.git',
  })
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
  @Get('/commits/csv')
  async downloadCommitsCsv(@Query() query: CommitRequest): Promise<any> {
    const author = query.author;
    const url = query.url;
    const commits = await this.commitService.getCommitsByAuthor(author, url);

    const csvData = this.convertToCsv(commits);
    const fileName = `${author}_commits.csv`;

    return {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename=${fileName}`,
      },
      body: csvData,
    };
  }

  convertToCsv(data: ICommit[]): string {
    const replacer = (key, value) => (value === null ? '' : value); // handle null values
    if (data !== null && data.length > 0) {
      const header = Object.keys(data[0]);
      const csv = [
        header.join(','), // header row first
        ...data.map((row) =>
          header
            .map((fieldName) => JSON.stringify(row[fieldName], replacer))
            .join(','),
        ),
      ].join('\r');
      return csv;
    } else {
      return 'Not have commits in period';
    }
  }
  //create get method to downloaf cvs file based in getCommitsByAuthor metod from service
}
