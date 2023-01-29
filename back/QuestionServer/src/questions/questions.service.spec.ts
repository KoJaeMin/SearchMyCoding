import { Question } from '../entities/questions.entity';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsService } from './questions.service';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockQuestionRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('QuestionsService', () => {
  let service: QuestionsService;
  let questionRepository: MockRepository<Question>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionsService,
        {
          provide : getRepositoryToken(Question),
          useValue : mockQuestionRepository()
        },
      ],
    }).compile();

    service = module.get<QuestionsService>(QuestionsService);
    questionRepository = module.get<MockRepository<Question>>(
      getRepositoryToken(Question),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
