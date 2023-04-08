import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCourseCategoryDto } from 'src/dto/CreateCourseCatgory.dto';
import { UpdateCourseCategoryDto } from 'src/dto/UpdateCourseCatgory.dto';
import { CourseCategory } from 'src/entities/coursecategory.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class CoursecategoryService {
    constructor(
        @InjectRepository(CourseCategory)
        private readonly coursecategoryRepository : Repository<CourseCategory>,
    ){}

    async getCourseIdListByCategoryId(categoryId : number, start : number, count : number) : Promise<number[]>{
        const CourseList : CourseCategory[] = await this.coursecategoryRepository
                            .createQueryBuilder('cil')
                            .select('course')
                            .where(`category = ${categoryId}`)
                            .distinct()
                            .skip(start - 1)
                            .take(count)
                            .getMany();
        
        //// courseIdList에서 나온 아이디들을 course 배열로 전환
        const FoundCourseIdList : number[] = CourseList.map((courseObj)=>courseObj.course);
        return FoundCourseIdList;
    }

    async getCategoryIdListByCourseId(courseId : number) : Promise<number[]>{
        const FoundOption : FindManyOptions<CourseCategory> = {
            where : {course : courseId}
        };
        const CategoryList : CourseCategory[] = await this.coursecategoryRepository.find(FoundOption);
        const FoundCategoryIdList : number[] = CategoryList.map((categoryObj)=>categoryObj.category);
        return FoundCategoryIdList;
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
        
        this.coursecategoryRepository.update({category : updateCourseCategoryDto.categoryId, course : updateCourseCategoryDto.courseId}, {course : updateCourseCategoryDto.idToModify});
    }

    async patchCategoryId(updateCourseCategoryDto : UpdateCourseCategoryDto) : Promise<void>{
        if(updateCourseCategoryDto.modified !== 'category')
            throw new BadRequestException(`It's wrong request. You cannot modify ${updateCourseCategoryDto.modified}.`);
        
        this.coursecategoryRepository.update({category : updateCourseCategoryDto.categoryId, course : updateCourseCategoryDto.courseId}, {category : updateCourseCategoryDto.idToModify});
    }
}
