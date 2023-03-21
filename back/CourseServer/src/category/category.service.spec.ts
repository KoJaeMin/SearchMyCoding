import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';
import { CategoryService } from './category.service';

const mockCategoryRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  insert: jest.fn()
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepository: MockRepository<Category>;
  let mockedCategory : Category;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide : getRepositoryToken(Category),
          useValue : mockCategoryRepository()
        },
      ],
    }).compile();

    
    service = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<MockRepository<Category>>(
      getRepositoryToken(Category),
    );

    mockedCategory = {
      id : 1,
      name : 'web'
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.todo('getAllCategory');
  it.todo('getOneCategory');
  it.todo('createCategory');
  it.todo('patchCategory');
});
