import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
    id: number;
    username?: string;
    iat?: number;
    exp?: number;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = String(req.headers["authorization"] || "");
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  
    if (!token) return res.status(401).json({ message: "No token provided" });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
      // attach user info on request
      (req as any).user = { id: decoded.id, username: decoded.username };
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
};