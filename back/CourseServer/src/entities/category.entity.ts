import { Entity, Column, PrimaryGeneratedColumn} from "typeorm";

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
}