import { getRepositoryToken } from '@nestjs/typeorm';
import { QuestionType } from '../entities/questiontypes.entity';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { QuestionTypesService } from './questiontypes.service';

const mockQuestionTypeRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;


describe('QuestionTypesService', () => {
  let service: QuestionTypesService;
  let questionTypeRepository: MockRepository<QuestionType>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionTypesService,
        {
          provide : getRepositoryToken(QuestionType),
          useValue : mockQuestionTypeRepository()
        },
      ],
    }).compile();

    service = module.get<QuestionTypesService>(QuestionTypesService);
    questionTypeRepository = module.get<MockRepository<QuestionType>>(
      getRepositoryToken(QuestionType),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
