import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Comment } from "./Comment";
import { Post } from "./Post";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: false })
  isVerified!: boolean;

  @Column({ type: "varchar", nullable: true })
  verificationCode?: string; // 6자리 인증 코드

  @OneToMany(() => Post, post => post.author)
  posts!: Post[];

  @OneToMany(() => Comment, comment => comment.author)
  comments!: Comment[];
}