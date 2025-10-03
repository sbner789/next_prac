import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Post } from "../entity/Post";

const repo = () => AppDataSource.getRepository(Post);

export const getPosts = async (req: Request, res: Response) => {
    try {
        const posts = await repo().find({ order: { createdAt: "DESC" } });
        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

export const getPostById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const post = await repo().findOneBy({ id });
        if (!post) return res.status(404).json({ message: "Not found" });
        res.json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error"});
    }
};

export const createPost = async (req: Request, res: Response) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) return res.status(400).json({ message: "title and content required" });
        const newPost = repo().create({ title, content });
        const saved = await repo().save(newPost);
        res.status(201).json(saved);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

export const updatePost = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const { title, content } = req.body;
        const post = await repo().findOneBy({ id });
        if (!post) return res.status(404).json({ message: "Not found" });
        post.title = title ?? post.title;
        post.content = content ?? post.content;
        const updated = await repo().save(post);
        res.json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

export const deletePost = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const result = await repo().delete(id);
        if (result.affected === 0) return res.status(404).json({ message: "Not found" });
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};