import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Answer } from "./answers.entity";

@Entity('questions')
export class Question{
    @PrimaryGeneratedColumn()
    id : number;

    @Column({
        type : "varchar",
        length : 500
    })
    contents : string;

    @Column({
        type : "varchar",
        length : 20,
    })
    questionType : string;

    @Column({
        type : "boolean",
        default : true
    })
    activate : boolean;

    @OneToMany((type) => Answer, (answer : Answer) => answer)
    answer? : Answer[]
}