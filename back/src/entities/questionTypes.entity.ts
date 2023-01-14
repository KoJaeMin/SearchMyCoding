import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Question } from "./questions.entity";

@Entity('questiontypes')
export class QuestionType{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    typename : string;

    @Column({
        type : "varchar",
        length : 1000
    })
    description : string;

    @OneToMany((type) => Question, (question : Question) => question.typeId)
    questions: Question[]
}