import { Module } from '@nestjs/common';
import { CoursecategoryService } from './coursecategory.service';
import { CoursecategoryController } from './coursecategory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseCategory } from 'src/entities/coursecategory.entity';
import { Course } from 'src/entities/course.entity';
import { Category } from 'src/entities/category.entity';
import { CourseModule } from 'src/course/course.module';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([CourseCategory, Course, Category]), CourseModule, CategoryModule],
  providers: [CoursecategoryService],
  controllers: [CoursecategoryController]
})
export class CoursecategoryModule {}
