import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('questions')
export class Question{
    @PrimaryGeneratedColumn()
    id : number;

    @Column({ 
        type: "int",
        nullable: false
    })
    typeId : number;

    @Column({ 
        type: "int",
        nullable: false
    })
    degree : number;

    @Column()
    contents : string;
}