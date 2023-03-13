import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany} from "typeorm";
import { Course } from "./course.entity";
import { CourseCategory } from "./coursecategory.entity";

@Entity('category')
export class Category{
    @PrimaryGeneratedColumn()
    id : number;

    @Column({
        type : "varchar",
        length : 500,
        unique: true,
        nullable : false
    })
    name : string;

    @ManyToMany(
        () => Course,
        course => course.category,
        {onDelete: 'NO ACTION', onUpdate: 'NO ACTION',},
      )
      course?: Course[];
}