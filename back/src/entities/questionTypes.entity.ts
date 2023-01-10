import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity('questiontypes')
export class QuestionType{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    TypeName : string;
}