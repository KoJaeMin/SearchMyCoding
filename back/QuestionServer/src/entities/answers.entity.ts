import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./questions.entity";

@Entity('answers')
export class Answer{
    @PrimaryGeneratedColumn()
    id : number;

    @ManyToOne((type) => Question, (question : Question) => question.id)
    question : string;

    @Column({
        type : "varchar",
        length : 50
    })
    type : string;

    @Column({
        type : "varchar",
        length : 500
    })
    contents : string
}