import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
        const validURI = this.convertValidURI(createCourseDto.link)
        const validIMG_URI = createCourseDto.img_link.length > 0 ? this.convertValidURI(createCourseDto.img_link) : '';

        if(!this.IsValidURI(validURI) || (validIMG_URI.length > 0 && !this.IsValidURI(validIMG_URI)) || !this.IsValidRating(createCourseDto.rating))
            throw new BadRequestException(`Bad Format`);
        
        const newCreateCourseDto : CreateCourseDto = {
            title : createCourseDto.title,
            link : validURI,
            price : createCourseDto.price,
            img_link : validIMG_URI??null,
            rating : Math.floor(createCourseDto.rating)??null
        }

        const newCourse : Course = this.courseRepository.create(createCourseDto);
        await this.courseRepository.insert(newCourse);
    }

    async patchCourse(courseTitle : string, updateCourseDto : UpdateCourseDto) : Promise<void>{
        try{
            await this.getOneCourse(courseTitle);
        }catch(err){
            throw err;
        }
        await this.courseRepository.update({title : courseTitle},updateCourseDto);
    }

    IsValidURI(uri : string) : boolean{
        const URIFormatChecker : RegExp = /^(https|http):\/\/[^\s$.?#].[^\s]*$/g;
        return URIFormatChecker.test(uri);
    }
    
    IsValidRating(rating : number) : boolean{
        return rating >= 0 && rating <= 100;
    }

    convertValidURI(uri : string) : string{
        return /^(https|http)/.test(uri) ? uri : 'https//' + uri;
    }
}
