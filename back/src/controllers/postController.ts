import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Post } from "../entity/Post";
import { User } from "../entity/User";

const postRepository = AppDataSource.getRepository(Post);
const userRepository = AppDataSource.getRepository(User);

export const createPost = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { title, content } = req.body;
    const user = await userRepository.findOneBy({ id: Number(userId) });
    if (!user) return res.status(404).json({ message: "User not found" });

    const post = postRepository.create({ title, content, author: user });
    await postRepository.save(post);
    return res.status(201).json(post);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error creating post" });
  }
};

  export const getPosts = async (_req: Request, res: Response) => {
    const posts = await postRepository.find({ relations: ["author", "comments"] });
    res.json(posts);
  };

  export const getPostById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const post = await postRepository.findOne({ where: { id: Number(id) }, relations: ["author", "comments"] });
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  };

  export const updatePost = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user?.id;
      const { id } = req.params;
      const { title, content } = req.body;
  
      const post = await postRepository.findOne({ where: { id: Number(id) }, relations: ["author"] });
      if (!post) return res.status(404).json({ message: "Post not found" });
      if (post.author.id !== Number(userId)) return res.status(403).json({ message: "Forbidden" });
  
      post.title = title ?? post.title;
      post.content = content ?? post.content;
      await postRepository.save(post);
      return res.json(post);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error updating post" });
    }
  };
  
  export const deletePost = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user?.id;
      const { id } = req.params;
  
      const post = await postRepository.findOne({ where: { id: Number(id) }, relations: ["author"] });
      if (!post) return res.status(404).json({ message: "Post not found" });
      if (post.author.id !== Number(userId)) return res.status(403).json({ message: "Forbidden" });
  
      await postRepository.remove(post);
      return res.json({ message: "Post deleted" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error deleting post" });
    }
  };