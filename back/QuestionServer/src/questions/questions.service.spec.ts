import { NotFoundException } from '@nestjs/common';
import { UpdateQuestionDto } from './../dto/UpdateQuestion.dto';
import { CreateQuestionDto } from './../dto/CreateQuestion.dto';
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
  insert: jest.fn()
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('QuestionsService', () => {
  let service: QuestionsService;
  let questionRepository: MockRepository<Question>;
  let mockedQuestion : Question;

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
    mockedQuestion = {
      id : 1,
      typeId : 1,
      degree : 1,
      contents : '노는 것을 좋아한다.',
      activate : true
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllQuestions', ()=>{
    it('should find all questions', async ()=>{
      /// jest fn()에 대한 resolved 값
      questionRepository.find.mockResolvedValue([]);

      const result = await service.getAllQuestions();
      /// 정확히 1회만큼 호출
      expect(questionRepository.find).toHaveBeenCalledTimes(1);
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOneQuestion', ()=>{
    const findId : number = 1;
    
    it('should find a question',async ()=>{
      questionRepository.findOne.mockResolvedValue(mockedQuestion);

      const result = await service.getOneQuestion(findId);
      expect(questionRepository.findOne).toHaveBeenCalledTimes(1);

      expect(result).toEqual(mockedQuestion);
    });

    it("should return a NotFoundException", async () => {
      try{
        await service.getOneQuestion(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe("createQuestion",()=>{
    it("should create a question", async () => {
      const mockedCreateQuestionDto : CreateQuestionDto = {
        typeId : 1,
        degree : 1,
        contents : '노는 것을 좋아한다.',
        activate : true
      }
      questionRepository.find.mockResolvedValue([]);
      const BeforeCreate = (await service.getAllQuestions()).length;
      expect(questionRepository.find).toHaveBeenCalledTimes(1);
      
      const result = await service.createQuestion(mockedCreateQuestionDto);

      questionRepository.find.mockResolvedValue([mockedQuestion]);
      const AfterCreate = (await service.getAllQuestions()).length;
      expect(questionRepository.find).toHaveBeenCalledTimes(2);

      expect(AfterCreate).toEqual(BeforeCreate + 1);
    });
  });

  describe("patchQuestion", ()=>{
    it("should patch a question", async () => {
      const mockedUpdateQuestionId : number = 1;
      const mockedUpdateQuestionDto : UpdateQuestionDto = {
        activate : false
      }
      const mockedUpdateQuestion : Question = {
        id : 1,
        typeId : 1,
        degree : 1,
        contents : '노는 것을 좋아한다.',
        activate : false
      };
      questionRepository.findOne.mockResolvedValue(mockedQuestion);
      const BeforeUpdate = await service.getOneQuestion(mockedUpdateQuestionId);
      expect(questionRepository.findOne).toHaveBeenCalledTimes(1);
      
      const result = await service.patchQuestion(mockedUpdateQuestionId, mockedUpdateQuestionDto)

      questionRepository.findOne.mockResolvedValue(mockedUpdateQuestion);
      const AfterUpdate = await service.getOneQuestion(mockedUpdateQuestionId);
      /// patchQuestion에도 findOne이 있기에 3번 call된다. 2를 넣으면 Error가 뜬다.
      expect(questionRepository.findOne).toHaveBeenCalledTimes(3);

      expect(BeforeUpdate.id).toEqual(AfterUpdate.id);
      expect(BeforeUpdate.typeId).toEqual(AfterUpdate.typeId);
      expect(BeforeUpdate.degree).toEqual(AfterUpdate.degree);
      expect(BeforeUpdate.contents).toEqual(AfterUpdate.contents);
      expect(BeforeUpdate.activate).toBeTruthy();
      expect(mockedUpdateQuestionDto.activate).toBeFalsy();
      expect(AfterUpdate.activate).toBeFalsy();
    })
  });
});
