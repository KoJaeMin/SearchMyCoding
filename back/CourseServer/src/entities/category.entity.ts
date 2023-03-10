import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Course } from "./course.entity";

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
    title : string;

    @ManyToOne((type) => Course, (course : Course) => course.id)
    courseId : number;
}