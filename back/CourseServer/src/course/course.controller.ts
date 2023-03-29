import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreateCourseDto } from 'src/dto/CreateCourse.dto';
import { UpdateCourseDto } from 'src/dto/UpdateCourse.dto';
import { Course } from 'src/entities/course.entity';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
    constructor(
        private readonly courseService : CourseService
    ){}

    @Get()
    @ApiOperation({
        "summary" : "모든 강의 조회하는 요청",
        "description" : "모든 강의 배열 형태로 반환한다."
    })
    async getAllCourse() : Promise<Course[]>{
        return await this.courseService.getAllCourse();
    }

    @Get(':id')
    @ApiOperation({
        "summary" : "Id를 이용한 강의 조회하는 요청",
        "description" : "Id를 이용하여 강의을 조회하고 json 형태로 반환한다.(단, 제목에 맞는 강의을 찾지 못한다면 에러를 반환한다.)"
    })
    async getOneCourseById(@Param("id") courseId : number) : Promise<Course>{
        return await this.courseService.getOneCourseById(courseId);
    }

    @Get(':title')
    @ApiOperation({
        "summary" : "제목을 이용한 강의 조회하는 요청",
        "description" : "제목을 이용하여 강의을 조회하고 json 형태로 반환한다.(단, 제목에 맞는 강의을 찾지 못한다면 에러를 반환한다.)"
    })
    async getOneCourseByTitle(@Param("title") courseTitle : string) : Promise<Course>{
        return await this.courseService.getOneCourseByTitle(courseTitle);
    }


    @Post('')
    @ApiOperation({
        "summary":"강의을 생성하는 요청",
        "description":"body를 CreateCourseDto에 맞춰 요청해야한다."
    })
    async createCourse(@Body() createCourseDto : CreateCourseDto){
        return this.courseService.createCourse(createCourseDto);
    }

    @Patch(':title')
    @ApiOperation({
        "summary" : "제목을 이용하여 강의의 일부를 수정하는 요청",
        "description" : "강의가 존재하여야 하며 body를 UpdateCourseDto에 맞춰 요청해야한다."
    })
    async patchCourse(@Param('title') courseTitle : string,@Body() updateCourseDto : UpdateCourseDto){
        return this.courseService.patchCourse(courseTitle, updateCourseDto);
    }
}
