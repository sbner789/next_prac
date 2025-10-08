import { 
    Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany
} from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column({ type: "text" })
    content!: string;

    @ManyToOne(() => User, user => user.posts, { eager: true, onDelete: "CASCADE" })
    author!: User;

    @OneToMany(() => Comment, comment => comment.post, { cascade: true })
    comments!: Comment[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}