import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateQuestionDto } from 'src/dto/CreateQuestion.dto';
describe('AppController (e2e)', () => {
  let app: INestApplication;

  /// beforeEach는 test 전마다 하는 각각의 작업을 뜻하며
  /// beforeAll은 test 전체를 하기 전 하나의 작업을 말한다.
  /// 한 번 app 생성 후 데이터를 유지하기 위해 beforEach -> beforeAll
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    /// beforeEach시
    /// 테스트마다 app 생성
    /// 이때 생성하는 app은 main.ts에 있는 app과는 다른 테스트용 어플리케이션
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async ()=>{
    await app.close();
  })

  describe('/questions', () => {
    it("/ GET", ()=>{
      return request(app.getHttpServer())
        .get('/questions')
        .expect(200)
    });

    it("/ POST", ()=>{
      const mockedCreateQuestionDto : CreateQuestionDto = {
        questionType : 'EI',
        contents : '한 달 동안 공부, 프로젝트에 매진해 있어서 제대로 쉰 날이 하루도 없다... <br/>가까스로 다 끝낸 뒤 나는?',
        activate : true
      }

      return request(app.getHttpServer())
        .post('/questions')
        .send(mockedCreateQuestionDto)
        .expect(201)
    })
    
    it.todo("/:id GET");
    it.todo("/type/:type GET");
    it.todo("/:id PATCH");
  });

  describe("/answers", ()=>{
    
    it.todo("/ GET");
    it.todo("/ POST");
    it.todo("/:id GET");
    it.todo("/question/:id GET");
    it.todo("/:id PATCH");
  })
});
