import { Router } from "express";
import { 
    getPosts, 
    getPostById, 
    createPost, 
    updatePost, 
    deletePost 
} from "../controllers/postController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authMiddleware, createPost);
router.get("/", getPosts);
router.get("/:id", getPostById);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);

export default router;