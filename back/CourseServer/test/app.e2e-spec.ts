import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { clearDB } from './testHelper';
import { CreateCourseDto } from 'src/dto/CreateCourse.dto';
import { testTypeORMConfig } from 'src/config/typeorm.config';
import { validationConfig } from 'src/config/validation.config';
import { CourseModule } from 'src/course/course.module';
import { CategoryModule } from 'src/category/category.module';
import { CoursecategoryModule } from 'src/coursecategory/coursecategory.module';
import { UpdateCourseDto } from 'src/dto/UpdateCourse.dto';
describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        TypeOrmModule.forRoot(testTypeORMConfig),
        CourseModule,
        CategoryModule,
        CoursecategoryModule
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe(validationConfig));
    await app.init();
  });

  /// 모든 것이 끝나면 app 종료
  afterAll(async ()=>{
    await clearDB();
    await app.close();
  })

  describe('/course', ()=>{
    const defaultPath = '/course';

    it("POST / (201)", ()=>{
      const createCourseDto : CreateCourseDto = {
        title : "basic-web",
        link : "https://www.example.link",
        img_link : "https://www.examplelink.link",
        rating : 0,
        price : 0
      };

      return request(app.getHttpServer())
        .post(defaultPath)
        .send(createCourseDto)
        .expect(201);
    });

    it("GET /:id (200)", ()=>{
      const courseId : number = 1;

      return request(app.getHttpServer())
        .get(defaultPath+`/id/${courseId}`)
        .expect(200);
    });

    it("GET /:id (404)", ()=>{
      const errorCourseId : number = 999;

      return request(app.getHttpServer())
        .get(defaultPath+`/id/${errorCourseId}`)
        .expect(404);
    });

    it("GET /:title (200)", ()=>{
      const courseTitle : string = "basic-web";

      return request(app.getHttpServer())
        .get(defaultPath+`/title/${courseTitle}`)
        .expect(200);
    });

    it("GET /:title (404)", ()=>{
      const errorCourseTitle : string = "basic-app";

      return request(app.getHttpServer())
        .get(defaultPath+`/title/${errorCourseTitle}`)
        .expect(404);
    });

    it("GET /all (200)", ()=>{
      return request(app.getHttpServer())
        .get(defaultPath+`/all`)
        .expect(200);
    });

    it("GET /bundle (200)", ()=>{
      const listNumber : number = 10;
      const numberOfCourseInList : number = 10;

      return request(app.getHttpServer())
        .get(defaultPath+`/bundle?list=${listNumber}&numberOfCourseInList=${numberOfCourseInList}`)
        .expect(200);
    });

    it("GET /list (200)", ()=>{
      const numberList : number[] = [1,2,3,4,5,6];
      return request(app.getHttpServer())
        .get(defaultPath+`/list?numberString=${numberList.join(',')}`)
        .expect(200);
    });

    it("PATCH /:title (200)", ()=>{
      const updateCourseTitle: string = 'basic-web';
      const updateCourseDto : UpdateCourseDto = {
        price : 100
      };
      return request(app.getHttpServer())
        .patch(defaultPath+`/${updateCourseTitle}`)
        .send(updateCourseDto)
        .expect(200);
    });

    it("PATCH /:title (404)", ()=>{
      const updateCourseTitle: string = 'basic-fasf';
      const updateCourseDto : UpdateCourseDto = {
        price : 100
      };
      return request(app.getHttpServer())
        .patch(defaultPath+`/${updateCourseTitle}`)
        .send(updateCourseDto)
        .expect(404);
    });
  });
  
});
