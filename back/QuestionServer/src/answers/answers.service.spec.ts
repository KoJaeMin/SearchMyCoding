import { UpdateAnswerDto } from '../dto/UpdateAnswer.dto';
import { CreateAnswerDto } from '../dto/CreateAnswer.dto';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Answer } from '../entities/answers.entity';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { AnswersService } from './answers.service';

const mockAnswerRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  insert: jest.fn()
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;


describe('AnswersService', () => {
  let service: AnswersService;
  let answerRepository: MockRepository<Answer>;
  let mockedAnswer : Answer;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnswersService,
        {
          provide : getRepositoryToken(Answer),
          useValue : mockAnswerRepository()
        },
      ],
    }).compile();

    service = module.get<AnswersService>(AnswersService);
    answerRepository = module.get<MockRepository<Answer>>(
      getRepositoryToken(Answer),
    );
    mockedAnswer = {
      id : 1,
      type : 'E',
      contents : '한 달 동안 못 논 게 한이다! 친구들과 만나 파워 수다!',
      question : '한 달 동안 공부, 프로젝트에 매진해 있어서 제대로 쉰 날이 하루도 없다... <br/>가까스로 다 끝낸 뒤 나는?'
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllAnswer', ()=>{
    it('should find all answers', async ()=>{
      /// jest fn()에 대한 resolved 값
      answerRepository.find.mockResolvedValue([]);

      const result = await service.getAllAnswer();
      /// 정확히 1회만큼 호출
      expect(answerRepository.find).toHaveBeenCalledTimes(1);
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOneAnswer', ()=>{
    const findId : number = 1;
    const findErrorId : number = 999;
    it('should find a question type',async ()=>{
      answerRepository.findOne.mockResolvedValue(mockedAnswer);

      const result = await service.getOneAnswer(findId);
      expect(answerRepository.findOne).toHaveBeenCalledTimes(1);

      expect(result).toEqual(mockedAnswer);
    });

    it("should return a NotFoundException", async () => {
      try{
        await service.getOneAnswer(findErrorId);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe("createAnswer",()=>{
    const mockedCreateAnswerDto : CreateAnswerDto = {
      type : 'E',
      contents : '한 달 동안 못 논 게 한이다! 친구들과 만나 파워 수다!',
      question : '한 달 동안 공부, 프로젝트에 매진해 있어서 제대로 쉰 날이 하루도 없다... <br/>가까스로 다 끝낸 뒤 나는?'
    }
    it("should create an answer", async () => {
      answerRepository.find.mockResolvedValue([]);
      const BeforeCreate = (await service.getAllAnswer()).length;
      expect(answerRepository.find).toHaveBeenCalledTimes(1);
      
      const result = await service.createAnswer(mockedCreateAnswerDto);

      answerRepository.find.mockResolvedValue([mockedAnswer]);
      const AfterCreate = (await service.getAllAnswer()).length;
      expect(answerRepository.find).toHaveBeenCalledTimes(2);

      expect(AfterCreate).toEqual(BeforeCreate + 1);
    });
  });

  describe("patchAnswer", ()=>{
    const mockedUpdateAnswerId : number = 1;
    const mockedErrorUpdateAnswerId : number = 999;
    const mockedUpdateAnswerDto : UpdateAnswerDto = {
      type : 'I',
      contents : '에너지 충전해야해.. 집콕.. 침대 최고...'
    }
    const mockedUpdateAnswer : Answer = {
      id : 1,
      type : 'I',
      contents : '에너지 충전해야해.. 집콕.. 침대 최고...',
      question : '한 달 동안 공부, 프로젝트에 매진해 있어서 제대로 쉰 날이 하루도 없다... <br/>가까스로 다 끝낸 뒤 나는?'
    };

    it("should patch an answer", async () => {
      answerRepository.findOne.mockResolvedValue(mockedAnswer);
      const BeforeUpdate = await service.getOneAnswer(mockedUpdateAnswerId);
      expect(answerRepository.findOne).toHaveBeenCalledTimes(1);
      
      const result = await service.patchAnswer(mockedUpdateAnswerId, mockedUpdateAnswerDto)

      answerRepository.findOne.mockResolvedValue(mockedUpdateAnswer);
      const AfterUpdate = await service.getOneAnswer(mockedUpdateAnswerId);
      /// patchQuestion에도 findOne이 있기에 3번 call된다. 2를 넣으면 Error가 뜬다.
      expect(answerRepository.findOne).toHaveBeenCalledTimes(3);

      expect(BeforeUpdate.id).toEqual(AfterUpdate.id);
      expect(BeforeUpdate.contents).toEqual(mockedAnswer.contents);
      expect(BeforeUpdate.question).toEqual(AfterUpdate.question);
      expect(AfterUpdate.id).toEqual(mockedUpdateAnswer.id);
      expect(AfterUpdate.contents).toEqual(mockedUpdateAnswer.contents);
    });
    
    it("should return a NotFoundException", async () => {
      answerRepository.findOne.mockResolvedValue(mockedAnswer);
      const BeforeUpdate = await service.getOneAnswer(mockedUpdateAnswerId);
      expect(answerRepository.findOne).toHaveBeenCalledTimes(1);
      try{
        await service.patchAnswer(mockedErrorUpdateAnswerId, mockedUpdateAnswerDto);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
