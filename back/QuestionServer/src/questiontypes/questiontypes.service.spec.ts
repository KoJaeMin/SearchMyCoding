import { UpdateQuestionTypeDto } from './../dto/UpdateQuestionType.dto';
import { CreateQuestionTypeDto } from './../dto/CreateQuestionType.dto';
import { NotFoundException } from '@nestjs/common';
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
  insert: jest.fn()
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;


describe('QuestionTypesService', () => {
  let service: QuestionTypesService;
  let questionTypeRepository: MockRepository<QuestionType>;
  let mockedQuestionType : QuestionType;

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
    mockedQuestionType = {
      id : 1,
      typename : 'E',
      description : '외향적인',
      questions : []
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllQuestionTypes', ()=>{
    it('should find all question types', async ()=>{
      /// jest fn()에 대한 resolved 값
      questionTypeRepository.find.mockResolvedValue([]);

      const result = await service.getAllQuestionTypes();
      /// 정확히 1회만큼 호출
      expect(questionTypeRepository.find).toHaveBeenCalledTimes(1);
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOneQuestionType', ()=>{
    const findId : number = 1;
    const findErrorId : number = 999;
    it('should find a question type',async ()=>{
      questionTypeRepository.findOne.mockResolvedValue(mockedQuestionType);

      const result = await service.getOneQuestionType(findId);
      expect(questionTypeRepository.findOne).toHaveBeenCalledTimes(1);

      expect(result).toEqual(mockedQuestionType);
    });

    it("should return a NotFoundException", async () => {
      try{
        await service.getOneQuestionType(findErrorId);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe("createQuestionType",()=>{
    const mockedCreateQuestionTypeDto : CreateQuestionTypeDto = {
      typename : 'E',
      description : '외향적인',
    }
    it("should create a question type", async () => {
      questionTypeRepository.find.mockResolvedValue([]);
      const BeforeCreate = (await service.getAllQuestionTypes()).length;
      expect(questionTypeRepository.find).toHaveBeenCalledTimes(1);
      
      const result = await service.createQuestionType(mockedCreateQuestionTypeDto);

      questionTypeRepository.find.mockResolvedValue([mockedQuestionType]);
      const AfterCreate = (await service.getAllQuestionTypes()).length;
      expect(questionTypeRepository.find).toHaveBeenCalledTimes(2);

      expect(AfterCreate).toEqual(BeforeCreate + 1);
    });
  });

  describe("patchQuestionType", ()=>{
    const mockedUpdateQuestionTypeId : number = 1;
    const mockedErrorUpdateQuestionTypeId : number = 999;
    const mockedUpdateQuestionTypeDto : UpdateQuestionTypeDto = {
      typename : 'I',
      description : '내향적인',
    }
    const mockedUpdateQuestionType : QuestionType = {
      id : 1,
      typename : 'I',
      description : '내향적인',
      questions:[]
    };

    it("should patch a question type", async () => {
      questionTypeRepository.findOne.mockResolvedValue(mockedQuestionType);
      const BeforeUpdate = await service.getOneQuestionType(mockedUpdateQuestionTypeId);
      expect(questionTypeRepository.findOne).toHaveBeenCalledTimes(1);
      
      const result = await service.patchQuestionType(mockedUpdateQuestionTypeId, mockedUpdateQuestionTypeDto)

      questionTypeRepository.findOne.mockResolvedValue(mockedUpdateQuestionType);
      const AfterUpdate = await service.getOneQuestionType(mockedUpdateQuestionTypeId);
      /// patchQuestion에도 findOne이 있기에 3번 call된다. 2를 넣으면 Error가 뜬다.
      expect(questionTypeRepository.findOne).toHaveBeenCalledTimes(3);

      expect(BeforeUpdate.id).toEqual(AfterUpdate.id);
      expect(BeforeUpdate.typename).toEqual(mockedQuestionType.typename);
      expect(BeforeUpdate.description).toEqual(mockedQuestionType.description);
      expect(BeforeUpdate.questions.length).toEqual(mockedQuestionType.questions.length);
      expect(AfterUpdate.typename).toEqual(mockedUpdateQuestionType.typename);
      expect(AfterUpdate.description).toEqual(mockedUpdateQuestionType.description);
      expect(AfterUpdate.questions.length).toEqual(mockedUpdateQuestionType.questions.length);
    });
    
    it("should return a NotFoundException", async () => {
      questionTypeRepository.findOne.mockResolvedValue(mockedQuestionType);
      const BeforeUpdate = await service.getOneQuestionType(mockedUpdateQuestionTypeId);
      expect(questionTypeRepository.findOne).toHaveBeenCalledTimes(1);
      try{
        await service.patchQuestionType(mockedErrorUpdateQuestionTypeId, mockedUpdateQuestionTypeDto);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
