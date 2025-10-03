import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn 
} from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 255 })
    title!: string;

    @Column("text")
    content!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}