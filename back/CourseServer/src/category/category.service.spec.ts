import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateCategoryDto } from 'src/dto/CreateCategory.dto';
import { UpdateCategoryDto } from 'src/dto/UpdateCategory.dto';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';
import { CategoryService } from './category.service';

const mockCategoryRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  insert: jest.fn(),
  createQueryBuilder: jest.fn().mockReturnValue({
      where: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockReturnThis()
    })
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

  describe('getAllCategory',()=>{
    it('should find all category', async ()=>{
      categoryRepository.find.mockResolvedValue([]);

      const result = await service.getAllCategory();
      expect(categoryRepository.find).toHaveBeenCalledTimes(1);
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOneCategoryById',()=>{
    const findId : number = 1;
    const findErrorId : number = 9999;
    it('should find a category',async ()=>{
      categoryRepository.findOne.mockResolvedValue(mockedCategory);

      const result = await service.getOneCategoryById(findId);
      expect(categoryRepository.findOne).toHaveBeenCalledTimes(1);

      expect(result).toEqual(mockedCategory);
    });

    it("should return a NotFoundException", async () => {
      try{
        await service.getOneCategoryById(findErrorId);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('getCategoryListByIdList', ()=>{
    const randomListLength : number = Math.floor(Math.random() * 10) + 1;
    const findIdList : number[] = new Array<number>(randomListLength).fill(0).map((_,index)=>index+1);
    const mockedCategoryList : Category[] = [{
      id : 1,
      name : 'web'
    }]
    it('should find category list', async ()=>{
      jest
        .spyOn(categoryRepository.createQueryBuilder(),'getMany')
        .mockResolvedValue(mockedCategoryList);
      const result : Category[] = await service.getCategoryListByIdList(findIdList);
      expect(categoryRepository.createQueryBuilder().getMany).toHaveBeenCalled();

      expect(result.length).toEqual(mockedCategoryList.length);
    })
  });

  describe('getOneCategoryByName',()=>{
    const findName : string = 'web';
    const findErrorName : string = 'app';
    it('should find a category',async ()=>{
      categoryRepository.findOne.mockResolvedValue(mockedCategory);

      const result = await service.getOneCategoryByName(findName);
      expect(categoryRepository.findOne).toHaveBeenCalledTimes(1);

      expect(result).toEqual(mockedCategory);
    });

    it("should return a NotFoundException", async () => {
      try{
        await service.getOneCategoryByName(findErrorName);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
  
  describe('createCategory',()=>{
    const mockedCreateCategoryDto : CreateCategoryDto = {
      name : 'web'
    };

    const mockedErrorCreateCategoryDto = {
      name : 'app',
      link : 'www.example.abc'
    }
    
    it("should create a category", async () => {
      categoryRepository.find.mockResolvedValue([]);
      const BeforeCreate = (await service.getAllCategory()).length;
      expect(categoryRepository.find).toHaveBeenCalledTimes(1);
      
      const result = await service.createCategory(mockedCreateCategoryDto);

      categoryRepository.find.mockResolvedValue([mockedCategory]);
      const AfterCreate = (await service.getAllCategory()).length;
      expect(categoryRepository.find).toHaveBeenCalledTimes(2);

      expect(AfterCreate).toEqual(BeforeCreate + 1);
    });

    it("should return a BadRequestException", async () => {
      try{
        await service.createCategory(mockedErrorCreateCategoryDto as CreateCategoryDto);
      }catch(e){
        expect(e).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('patchCategory',()=>{
    const mockedFindName : string = 'web';
    const mockedUpdateCategoryName : string = 'app';
    const mockedErrorUpdateCategoryName : string = 'AI';
    const mockedUpdateCategoryDto : UpdateCategoryDto = {
      name : 'app'
    }
    const mockedUpdateCategory : Category = {
      id : 1,
      name : 'app'
    };

    const mockedErrorUpdateCategoryDto = {
      name : 'app',
      link : 'www.example.abc'
    }

    it("should patch a category", async () => {
      categoryRepository.findOne.mockResolvedValue(mockedCategory);
      const BeforeUpdate = await service.getOneCategoryByName(mockedFindName);
      expect(categoryRepository.findOne).toHaveBeenCalledTimes(1);
      
      const result = await service.patchCategory(mockedFindName, mockedUpdateCategoryDto)

      categoryRepository.findOne.mockResolvedValue(mockedUpdateCategory);
      const AfterUpdate = await service.getOneCategoryByName(mockedUpdateCategoryName);
      expect(categoryRepository.findOne).toHaveBeenCalledTimes(3);

      expect(BeforeUpdate.id).toEqual(AfterUpdate.id);
      expect(AfterUpdate.id).toEqual(mockedUpdateCategory.id);
      expect(AfterUpdate.name).toEqual(mockedUpdateCategory.name);
    });
    
    it("should return a NotFoundException", async () => {
      categoryRepository.findOne.mockResolvedValue(mockedCategory);
      const BeforeUpdate = await service.getOneCategoryByName(mockedFindName);
      expect(categoryRepository.findOne).toHaveBeenCalledTimes(1);
      try{
        await service.patchCategory(mockedErrorUpdateCategoryName, mockedUpdateCategoryDto);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });

    it("should return a BadRequestException", async () => {
      categoryRepository.findOne.mockResolvedValue(mockedCategory);
      const BeforeUpdate = await service.getOneCategoryByName(mockedFindName);
      expect(categoryRepository.findOne).toHaveBeenCalledTimes(1);
      try{
        await service.patchCategory(mockedFindName, mockedErrorUpdateCategoryDto as UpdateCategoryDto);
      }catch(e){
        expect(e).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
