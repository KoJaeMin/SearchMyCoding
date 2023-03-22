import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from 'src/entities/course.entity';
import { CreateCourseDto } from 'src/dto/CreateCourse.dto';
import { UpdateCourseDto } from 'src/dto/UpdateCourse.dto';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course)
        private courseRepository : Repository<Course>
    ){}

    async getAllCourse() : Promise<Course[]>{
        return await this.courseRepository.find();
    }

    async getOneCourse(courseTitle : string) : Promise<Course>{
        const FoundCourse : Course = await this.courseRepository.findOneBy({title : courseTitle})
        if(!FoundCourse)
            throw new NotFoundException(`Course with Title ${courseTitle} is not found.`);
        return FoundCourse;
    }

    async createCourse(createCourseDto : CreateCourseDto) : Promise<void>{
        const newCategory : Course = this.courseRepository.create(createCourseDto)
        await this.courseRepository.insert(newCategory);
    }

    async patchCourse(courseTitle : string, updateCourseDto : UpdateCourseDto) : Promise<void>{
        try{
            await this.getOneCourse(courseTitle);
        }catch(err){
            throw err;
        }
        await this.courseRepository.update({title : courseTitle},updateCourseDto);
    }
    
}
