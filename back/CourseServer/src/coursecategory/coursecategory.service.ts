import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { CourseService } from 'src/course/course.service';
import { CreateCourseCategoryDto } from 'src/dto/CreateCourseCatgory.dto';
import { UpdateCourseCategoryDto } from 'src/dto/UpdateCourseCatgory.dto';
import { Category } from 'src/entities/category.entity';
import { Course } from 'src/entities/course.entity';
import { CourseCategory } from 'src/entities/coursecategory.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class CoursecategoryService {
    constructor(
        @InjectRepository(CourseCategory)
        private readonly coursecategoryRepository : Repository<CourseCategory>,
        private readonly courseService : CourseService,
        private readonly categoryService : CategoryService
    ){}

    async getCourseByCategoryName(categoryName : string, start : number, count : number) : Promise<Course[]>{
        const FoundCategory : Category = await this.categoryService.getOneCategoryByName(categoryName);
        const CourseIdList : CourseCategory[] = await this.coursecategoryRepository
                            .createQueryBuilder('cil')
                            .select('course')
                            .where(`category = ${FoundCategory.id}`)
                            .distinct()
                            .skip(start - 1)
                            .take(count)
                            .getMany();
        
        //// courseIdList에서 나온 아이디들을 course 배열로 전환
        const FoundCourseIdList : number[] = CourseIdList.map((courseObj)=>courseObj.course);
        const FoundCourse : Course[] = await this.courseService.getCourseListByIdList(FoundCourseIdList);
        return FoundCourse;
    }

    async getAllCategoryIdByCourseTitle(courseTitle : string) : Promise<CourseCategory[]>{
        const FoundCourse : Course = await this.courseService.getOneCourseByTitle(courseTitle);
        const FoundOption : FindManyOptions<CourseCategory> = {
            where : {course : FoundCourse.id}
        };
        return await this.coursecategoryRepository.find(FoundOption);
    }

    async createCourseCategory(createCourseCategory : CreateCourseCategoryDto) : Promise<void>{
        const FoundCategory : Category = await this.categoryService.getOneCategoryByName(createCourseCategory.category);
        const FoundCourse : Course = await this.courseService.getOneCourseByTitle(createCourseCategory.course);
        
        const newCourseCategory : CourseCategory = this.coursecategoryRepository.create({
            course : FoundCourse.id,
            category : FoundCategory.id
        })
        
        this.coursecategoryRepository.insert(newCourseCategory);
    }

    async patchCourseByCategoryName(updateCourseCategoryDto : UpdateCourseCategoryDto) : Promise<void>{
        if(updateCourseCategoryDto.modified !== 'course')
            throw new BadRequestException(`It's wrong request. You cannot modify ${updateCourseCategoryDto.modified}.`);
        
        const FoundCategory : Category = await this.categoryService.getOneCategoryByName(updateCourseCategoryDto.category);
        const FoundCourse : Course = await this.courseService.getOneCourseByTitle(updateCourseCategoryDto.course);
        const FoundCourseToModify : Course = await this.courseService.getOneCourseById(updateCourseCategoryDto.idToModify);
        
        this.coursecategoryRepository.update({category : FoundCategory.id, course : FoundCourse.id}, {course : FoundCourseToModify.id});
    }

    async patchCourseByCourseTitle(updateCourseCategoryDto : UpdateCourseCategoryDto) : Promise<void>{
        if(updateCourseCategoryDto.modified !== 'category')
            throw new BadRequestException(`It's wrong request. You cannot modify ${updateCourseCategoryDto.modified}.`);
        
        const FoundCategory : Category = await this.categoryService.getOneCategoryByName(updateCourseCategoryDto.category);
        const FoundCourse : Course = await this.courseService.getOneCourseByTitle(updateCourseCategoryDto.course);
        const FoundCategoryToModify : Category = await this.categoryService.getOneCategoryById(updateCourseCategoryDto.idToModify);
        
        this.coursecategoryRepository.update({category : FoundCategory.id, course : FoundCourse.id}, {category : FoundCategoryToModify.id});
    }
}
