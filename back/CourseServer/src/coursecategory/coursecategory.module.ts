import { Module } from '@nestjs/common';
import { CoursecategoryService } from './coursecategory.service';
import { CoursecategoryController } from './coursecategory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Course } from 'src/entities/course.entity';
import { CourseCategory } from 'src/entities/coursecategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Course, CourseCategory])],
  providers: [CoursecategoryService],
  controllers: [CoursecategoryController]
})
export class CoursecategoryModule {}
