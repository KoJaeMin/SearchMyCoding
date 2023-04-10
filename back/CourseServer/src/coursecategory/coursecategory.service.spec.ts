import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { CourseService } from 'src/course/course.service';
import { CourseCategory } from 'src/entities/coursecategory.entity';
import { Repository } from 'typeorm';
import { CourseCategoryService } from './coursecategory.service';
import { createMock } from '@golevelup/ts-jest';
import { Category } from 'src/entities/category.entity';
import { Course } from 'src/entities/course.entity';

const MockRepository = {
  find: jest.fn(),
  findBy : jest.fn(),
  findOneBy: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  insert: jest.fn(),
  createQueryBuilder: jest.fn().mockReturnValue({
    where: jest.fn().mockReturnThis(),
    distinct: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockReturnThis()
  })
}

const mockCourseCategoryRepository = () => MockRepository;

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('CoursecategoryService', () => {
  let service: CourseCategoryService;
  let courseService : CourseService;
  let categoryService : CategoryService;
  let courseCategoryRepository : MockRepository<CourseCategory>;
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseCategoryService,
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

    service = module.get<CourseCategoryService>(CourseCategoryService);
    courseService = module.get<CourseService>(CourseService);
    categoryService = module.get<CategoryService>(CategoryService);
    courseCategoryRepository = module.get<MockRepository<CourseCategory>>(
      getRepositoryToken(CourseCategory),
    );
    
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  describe("getCourseListByCategoryName", ()=>{
    it('should find all course', async ()=>{
      const mockStartNumber : number = 1;
      const mockCountNumber : number = 1
      const mockCourseId : number = 1;
      const mockCategoryId : number = 1;
      const mockCourseCategoryId : number = 1;
      const mockCategoryName : string = "web";
      const mockCategory : Category = {
        id : mockCategoryId,
        name : mockCategoryName
      };
      const mockCourseCategory : CourseCategory[] = [{
        id : mockCourseCategoryId,
        course : mockCourseId,
        category : mockCategoryId
      }];
      const mockCourseList : Course[] = [
        {
          id : mockCourseId,
          link : 'https://localhost',
          title : '웹 기초',
          price : 0,
        }
      ];

      jest
        .spyOn(categoryService, 'getOneCategoryByName')
        .mockResolvedValue(mockCategory);

      jest
        .spyOn(courseCategoryRepository.createQueryBuilder(),'getMany')
        .mockResolvedValue(mockCourseCategory)
      
      jest
        .spyOn(courseService, 'getCourseListByIdList')
        .mockResolvedValue(mockCourseList);

      const result : Course[] = await service.getCourseListByCategoryName(mockCategoryName, mockStartNumber, mockCountNumber);
      
      expect(categoryService.getOneCategoryByName).toHaveBeenCalledTimes(1);
      expect(courseCategoryRepository.createQueryBuilder().getMany).toHaveBeenCalledTimes(1);
      expect(courseService.getCourseListByIdList).toHaveBeenCalledTimes(1);
      
      expect(result).toBeInstanceOf(Array);
    });
  });

  it.todo('getCategoryListByCourseTitle');
  it.todo('createCourseCategory');
  it.todo('patchCourseId');
  it.todo('patchCategoryId');
});
