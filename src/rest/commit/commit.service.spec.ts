import { Test, TestingModule } from '@nestjs/testing';
import { CommitService } from './commit.service';
import nodegit from 'nodegit';
//import { getCommitsByAuthor } from './your_module';
describe('CommitService', () => {
  let service: CommitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommitService],
    }).compile();

    service = module.get<CommitService>(CommitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCommitsByAuthor', () => {
    const repositoryPath = '/path/to/repository';
    const authorName = 'John Doe';
    const commitSha = 'a1b2c3d4e5';

    const mockAuthor = {
      name: jest.fn().mockReturnValue(authorName),
    };

    const mockCommit = {
      author: jest.fn().mockReturnValue(mockAuthor),
      sha: jest.fn().mockReturnValue(commitSha),
      message: jest.fn(),
      timeMs: jest.fn(),
    };

    const mockHistory = {
      next: jest.fn().mockReturnValue(mockCommit),
      reset: jest.fn(),
    };

    const mockHeadCommit = {
      history: jest.fn().mockReturnValue(mockHistory),
    };

    const mockRepository = {
      getHeadCommit: jest.fn().mockReturnValue(mockHeadCommit),
    };

    beforeAll(() => {
      // Mocking the nodegit.Repository.open function
      spyOn(nodegit.Repository, 'open').and.returnValue(mockRepository);
    });

    it('should return a list of commits by author name', async () => {
      const result = await service.getCommitsByAuthor(
        authorName,
        repositoryPath,
      );

      expect(nodegit.Repository.open).toHaveBeenCalledWith(repositoryPath);
      expect(mockRepository.getHeadCommit).toHaveBeenCalled();

      expect(mockHistory.reset).toHaveBeenCalled();
      expect(mockHistory.next).toHaveBeenCalledTimes(1);
      expect(mockCommit.sha).toHaveBeenCalledTimes(1);
      expect(mockCommit.author.name).toHaveBeenCalledTimes(1);

      const expectedCommits = [
        {
          hash: commitSha,
          message: '',
          author: authorName,
          timestamp: expect.any(Number),
          sha: '',
          url: '',
          date: undefined,
          repository: '',
          branch: '',
          files: [],
        },
      ];
      expect(result).toEqual(expectedCommits);
    });
  });
});
