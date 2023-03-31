import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Course } from 'src/entities/course.entity';
import { CreateCourseDto } from 'src/dto/CreateCourse.dto';
import { UpdateCourseDto } from 'src/dto/UpdateCourse.dto';
import { convertValidURI, IsValidRating, IsValidURI } from 'src/utils/format';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository : Repository<Course>
    ){}

    async getAllCourse() : Promise<Course[]>{
        return await this.courseRepository.find();
    }

    async getOneCourseById(courseId : number) : Promise<Course>{
        const FoundCourse : Course = await this.courseRepository.findOneBy({id : courseId})
        if(!FoundCourse)
            throw new NotFoundException(`Course with Id ${courseId} is not found.`);
        return FoundCourse;
    }

    async getCourseList(listNumber : number, numberOfCourseInList : number, order : 'asc' | 'desc' | undefined | null) : Promise<Course[]>{
        const findOption : FindManyOptions<Course> = {
            skip : (listNumber - 1) * numberOfCourseInList,
            take : numberOfCourseInList
        }

        findOption.order = order === 'desc' ? {title : 'DESC', id : 'ASC'} : {title : 'ASC', id : 'ASC'};

        const FoundCourse : Course[] = await this.courseRepository.find(findOption);
        return FoundCourse;
    }

    async getOneCourseByTitle(courseTitle : string) : Promise<Course>{
        const FoundCourse : Course = await this.courseRepository.findOneBy({title : courseTitle})
        if(!FoundCourse)
            throw new NotFoundException(`Course with Title ${courseTitle} is not found.`);
        return FoundCourse;
    }

    async createCourse(createCourseDto : CreateCourseDto) : Promise<void>{
        const [validURI, validIMG_URI] = await this.convertFormat(createCourseDto.link, createCourseDto.img_link);

        if(!IsValidURI(validURI))
            throw new BadRequestException(`Bad Format`);
        
        const newCreateCourseDto : CreateCourseDto = {
            title : createCourseDto.title,
            link : validURI,
            price : createCourseDto.price,
            img_link : IsValidURI(validIMG_URI) ? validIMG_URI : null,
            rating : IsValidRating(createCourseDto.rating) ? Math.floor(createCourseDto.rating) : null
        }

        const newCourse : Course = this.courseRepository.create(createCourseDto);
        await this.courseRepository.insert(newCourse);
    }

    async patchCourse(courseTitle : string, updateCourseDto : UpdateCourseDto) : Promise<void>{
        try{
            await this.getOneCourseByTitle(courseTitle);
        }catch(err){
            throw err;
        }
        const [validURI, validIMG_URI] = await this.convertFormat(updateCourseDto.link, updateCourseDto.img_link);
        
        if(validURI !== null && !IsValidURI(validURI))
            throw new BadRequestException(`Bad Format`);

        if(validIMG_URI !== null && !IsValidURI(validIMG_URI))
            throw new BadRequestException(`Bad Format`);

        await this.courseRepository.update({title : courseTitle},updateCourseDto);
    }

    async convertFormat(link : string | null, img_link : string | null){
        const validURI = !!link ? convertValidURI(link) : null;
        const validIMG_URI = !!img_link ? convertValidURI(img_link) : null;
        return [validURI, validIMG_URI];
    }
}
