import { Router } from "express";
import { createComment, getCommentsByPost, updateComment, deleteComment } from "../controllers/commentController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authMiddleware, createComment);
router.get("/:postId", getCommentsByPost);
router.put("/:id", authMiddleware, updateComment);
router.delete("/:id", authMiddleware, deleteComment);

export default router;