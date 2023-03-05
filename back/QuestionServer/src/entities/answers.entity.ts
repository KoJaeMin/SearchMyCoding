import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./questions.entity";

@Entity('answers')
export class Answer{
    @PrimaryGeneratedColumn()
    id : number;

    @ManyToOne((type) => Question, (question : Question) => question.id)
    questionId : number;

    @Column({
        type : "varchar",
        length : 50
    })
    answerType : string;

    @Column({
        type : "varchar",
        length : 500,
        unique: true
    })
    contents : string
}