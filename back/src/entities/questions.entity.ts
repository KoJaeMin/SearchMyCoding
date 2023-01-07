import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { QuestionType } from "./questiontypes.entity";

@Entity('questions')
export class Question{
    @PrimaryGeneratedColumn()
    id : number;

    @ManyToOne((type) => QuestionType, (questiontpye) => questiontpye.id)
    @JoinColumn({
        name : 'typeId'
    })
    typeId : number;

    @Column({ 
        type: "int",
        nullable: false
    })
    degree : number;

    @Column({
        type : "varchar",
        length : 500
    })
    contents : string;
}