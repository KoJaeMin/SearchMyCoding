import { BadRequestException, Injectable } from '@nestjs/common';
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
export class CourseCategoryService {
    constructor(
        @InjectRepository(CourseCategory)
        private readonly coursecategoryRepository : Repository<CourseCategory>,
        private readonly courseService : CourseService,
        private readonly categoryService : CategoryService
    ){}

    async getCourseListByCategoryName(categoryName : string, start : number, count : number) : Promise<Course[]>{
        const FoundCourse : Category = await this.categoryService.getOneCategoryByName(categoryName);
        const CourseList : CourseCategory[] = await this.coursecategoryRepository
                            .createQueryBuilder('cil')
                            .where(`category = ${FoundCourse.id}`)
                            .distinct()
                            .skip(start - 1)
                            .take(count)
                            .getMany();
        
        //// courseIdList에서 나온 아이디들을 course 배열로 전환
        const FoundCourseIdList : number[] = CourseList.map((courseObj)=>courseObj.course);
        const FoundCourseList : Course[] = await this.courseService.getCourseListByIdList(FoundCourseIdList);
        return FoundCourseList;
    }

    async getCategoryListByCourseTitle(courseTitle : string) : Promise<Category[]>{
        const FoundCourse : Course = await this.courseService.getOneCourseByTitle(courseTitle);
        const FoundOption : FindManyOptions<CourseCategory> = {
            where : {course : FoundCourse.id}
        };
        const CategoryList : CourseCategory[] = await this.coursecategoryRepository.find(FoundOption);
        const FoundCategoryIdList : number[] = CategoryList.map((categoryObj)=>categoryObj.category);
        const FoundCategoryList : Category[] = await this.categoryService.getCategoryListByIdList(FoundCategoryIdList);
        return FoundCategoryList;
    }

    async createCourseCategory(createCourseCategory : CreateCourseCategoryDto) : Promise<void>{
        const newCourseCategory : CourseCategory = this.coursecategoryRepository.create({
            course : createCourseCategory.courseId,
            category : createCourseCategory.categoryId
        })
        
        this.coursecategoryRepository.insert(newCourseCategory);
    }

    async patchCourseId(updateCourseCategoryDto : UpdateCourseCategoryDto) : Promise<void>{
        if(updateCourseCategoryDto.modified !== 'course')
            throw new BadRequestException(`It's wrong request. You cannot modify ${updateCourseCategoryDto.modified}.`);
        
        const FoundCategory : Category = await this.categoryService.getOneCategoryById(updateCourseCategoryDto.categoryId);
        const FoundCourse : Course = await this.courseService.getOneCourseById(updateCourseCategoryDto.courseId);
        const FoundCourseToModify : Course = await this.courseService.getOneCourseById(updateCourseCategoryDto.idToModify);

        await this.coursecategoryRepository.update({category : FoundCategory.id, course : FoundCourse.id}, {course : FoundCourseToModify.id});
    }

    async patchCategoryId(updateCourseCategoryDto : UpdateCourseCategoryDto) : Promise<void>{
        if(updateCourseCategoryDto.modified !== 'category')
            throw new BadRequestException(`It's wrong request. You cannot modify ${updateCourseCategoryDto.modified}.`);

        const FoundCategory : Category = await this.categoryService.getOneCategoryById(updateCourseCategoryDto.categoryId);
        const FoundCourse : Course = await this.courseService.getOneCourseById(updateCourseCategoryDto.courseId);
        const FoundCategoryToModify : Category = await this.categoryService.getOneCategoryById(updateCourseCategoryDto.idToModify);
    
        await this.coursecategoryRepository.update({category : FoundCategory.id, course : FoundCourse.id}, {course : FoundCategoryToModify.id});
    }
}
