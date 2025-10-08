import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({ type: "text" })
    content!: string;
  
    @ManyToOne(() => User, user => user.comments, { eager: true, onDelete: "CASCADE" })
    author!: User;
  
    @ManyToOne(() => Post, post => post.comments, { onDelete: "CASCADE" })
    post!: Post;
  
    @CreateDateColumn()
    createdAt!: Date;
  
    @UpdateDateColumn()
    updatedAt!: Date;
}