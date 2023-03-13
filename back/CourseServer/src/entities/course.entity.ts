import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Category } from "./category.entity";
import { CourseCategory } from "./coursecategory.entity";

@Entity('course')
export class Course{
    @PrimaryGeneratedColumn()
    id : number;

    @Column({
        type : "varchar",
        length : 500,
        unique: true,
        nullable : false
    })
    title : string;

    @Column({
        type : "varchar",
        length : 2000,
        unique: true,
        nullable : false
    })
    link : string;

    @Column({
        type : "varchar",
        length : 2000,
        nullable : true
    })
    img_link : string;

    @Column({
        nullable : false
    })
    price : number;

    @Column({
        nullable : true
    })
    rating : number;

    @ManyToMany(
        () => Category, 
        category => category.course, //optional
        {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
        @JoinTable({
          name: 'course_category',
          joinColumn: {
            name: 'course_id',
            referencedColumnName: 'id',
          },
          inverseJoinColumn: {
            name: 'category_id',
            referencedColumnName: 'id',
          },
        })
        category?: Category[];
}