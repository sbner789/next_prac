import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Comment } from "../entity/Comment";
import { User } from "../entity/User";
import { Post } from "../entity/Post";

const commentRepository = AppDataSource.getRepository(Comment);
const userRepository = AppDataSource.getRepository(User);
const postRepository = AppDataSource.getRepository(Post);

export const createComment = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { postId, content } = req.body;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await userRepository.findOneBy({ id: Number(userId) });
    const post = await postRepository.findOneBy({ id: Number(postId) });
    if (!user || !post) return res.status(404).json({ message: "User or Post not found" });

    const comment = commentRepository.create({ content, author: user, post });
    await commentRepository.save(comment);
    return res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error creating comment" });
  }
};

export const getCommentsByPost = async (req: Request, res: Response) => {
    const { postId } = req.params;
    const comments = await commentRepository.find({
      where: { post: { id: Number(postId) } },
      relations: ["author", "post"],
    });
    res.json(comments);
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { id } = req.params;
    const { content } = req.body;

    const comment = await commentRepository.findOne({ where: { id: Number(id) }, relations: ["author"] });
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (comment.author.id !== Number(userId)) return res.status(403).json({ message: "Forbidden" });

    comment.content = content ?? comment.content;
    await commentRepository.save(comment);
    return res.json(comment);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error updating comment" });
  }
};
  
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { id } = req.params;

    const comment = await commentRepository.findOne({ where: { id: Number(id) }, relations: ["author"] });
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (comment.author.id !== Number(userId)) return res.status(403).json({ message: "Forbidden" });

    await commentRepository.remove(comment);
    return res.json({ message: "Comment deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error deleting comment" });
  }
};