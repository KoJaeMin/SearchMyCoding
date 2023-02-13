import { UpdateQuestionDto } from './../src/dto/UpdateQuestion.dto';
import { validationConfig } from './../src/config/validation.config';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
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
    /// 테스트 환경에서도 실제 환경과 동일한 환경을 제공해야 제대로 된 테스트가 된다.
    /// 만약 아래의 pipe 부분이 없다면 parameter가 항상 string으로 된다.
    app.useGlobalPipes(new ValidationPipe(validationConfig));
    await app.init();
  });

  /// 모든 것이 끝나면 app 종료
  afterAll(async ()=>{
    await app.close();
  })

  describe('/questions', () => {
    const defaultPath = '/questions';
    
    it("GET / (200)", ()=>{
      return request(app.getHttpServer())
        .get('/questions')
        .expect(200);
    });

    it("POST / (201)", ()=>{
      const mockedCreateQuestionDto : CreateQuestionDto = {
        questionType : 'EI',
        contents : '한 달 동안 공부, 프로젝트에 매진해 있어서 제대로 쉰 날이 하루도 없다... <br/>가까스로 다 끝낸 뒤 나는?',
        activate : true
      }

      return request(app.getHttpServer())
        .post(defaultPath)
        .send(mockedCreateQuestionDto)
        .expect(201);
    })
    
    it("GET /:id (200)", ()=>{
      const findId : number = 1;
      
      return request(app.getHttpServer())
        .get(defaultPath+`/${findId}`)
        .expect(200);
    });

    it("GET /:id (404)", ()=>{
      const findErrorId : number = 999;
      
      return request(app.getHttpServer())
        .get(defaultPath+`/${findErrorId}`)
        .expect(404);
    });

    it("GET /type/:type (200)", ()=>{
      const findQuestionType : string = 'EI';
      return request(app.getHttpServer())
        .get(defaultPath+`/type/${findQuestionType}`)
        .expect(200);
    });

    it("GET /type/:type (404)", ()=>{
      const findErrorQuestionType : string = 'SN';
      return request(app.getHttpServer())
        .get(defaultPath+`/type/${findErrorQuestionType}`)
        .expect(404);
    });

    it("PATCH /:id (200)", ()=>{
      const mockedUpdateQuestionId : number = 1;
      const mockedUpdateQuestionDto : UpdateQuestionDto = {
        activate : false
      };
      return request(app.getHttpServer())
        .get(defaultPath+`/${mockedUpdateQuestionId}`)
        .send(mockedUpdateQuestionDto)
        .expect(200);
    });
  });

  describe("/answers", ()=>{
    
    it.todo("GET /");
    it.todo("POST /");
    it.todo("GET /:id");
    it.todo("GET /question/:id");
    it.todo("PATCH /:id");
  })
});
