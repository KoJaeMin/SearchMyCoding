import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { CourseService } from 'src/course/course.service';
import { CourseCategory } from 'src/entities/coursecategory.entity';
import { Repository } from 'typeorm';
import { CoursecategoryService } from './coursecategory.service';
import { createMock } from '@golevelup/ts-jest';

const MockRepository = {
  find: jest.fn(),
  findBy : jest.fn(),
  findOneBy: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  insert: jest.fn()
}

const mockCourseCategoryRepository = () => MockRepository;
const mockCourseRepository = () => MockRepository;
const mockCategoryRepository = () => MockRepository;

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('CoursecategoryService', () => {
  let service: CoursecategoryService;
  let courseService : CourseService;
  let categoryService : CategoryService;
  let courseCategoryRepository : MockRepository<CourseCategory>;
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursecategoryService,
        {
          provide : getRepositoryToken(CourseCategory),
          useValue : mockCourseCategoryRepository()
        },
        {
          provide: CourseService,
          useValue: createMock<CourseService>()
        },
        {
          provide: CategoryService,
          useValue: createMock<CategoryService>()
        }
      ],
    }).compile();

    service = module.get<CoursecategoryService>(CoursecategoryService);
    courseService = module.get<CourseService>(CourseService);
    categoryService = module.get<CategoryService>(CategoryService);
    courseCategoryRepository = module.get<MockRepository<CourseCategory>>(
      getRepositoryToken(CourseCategory),
    );
    
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
