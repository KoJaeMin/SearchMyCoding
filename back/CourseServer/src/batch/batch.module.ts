import { Module } from '@nestjs/common';
import { BatchService } from './batch.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Course } from 'src/entities/course.entity';
import { CourseCategory } from 'src/entities/coursecategory.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([CourseCategory, Course, Category])
  ],
  providers: [BatchService]
})
export class BatchModule {}
