import { Module } from '@nestjs/common';
import { CoursecategoryService } from './coursecategory.service';
import { CoursecategoryController } from './coursecategory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Course } from 'src/entities/course.entity';
import { CourseCategory } from 'src/entities/coursecategory.entity';
import { CourseModule } from 'src/course/course.module';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Course, CourseCategory]), CourseModule, CategoryModule],
  providers: [CoursecategoryService],
  controllers: [CoursecategoryController]
})
export class CoursecategoryModule {}
