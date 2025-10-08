import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { sendVerificationEmail } from "../utils/mailer";

const router = Router();

// 1단계: 회원가입 요청 -> DB 저장 + 인증 코드 발송
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const userRepo = AppDataSource.getRepository(User);

  const existing = await userRepo.findOneBy([{ username }, { email }]);
  if (existing) return res.status(400).json({ message: "이미 존재하는 계정" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  const user = userRepo.create({
    username,
    email,
    password: hashedPassword,
    verificationCode: code,
  });
  await userRepo.save(user);

  await sendVerificationEmail(email, code);
  res.json({ message: "회원가입 성공, 이메일 인증 필요" });
});

// 2단계: 인증 코드 확인
router.post("/verify", async (req, res) => {
  const { email, code } = req.body;
  const userRepo = AppDataSource.getRepository(User);

  const user = await userRepo.findOneBy({ email });
  if (!user) return res.status(400).json({ message: "사용자 없음" });
  if (user.isVerified) return res.status(400).json({ message: "이미 인증됨" });

  if (user.verificationCode !== code) return res.status(400).json({ message: "인증 코드 불일치" });

  user.isVerified = true;
  user.verificationCode = "";
  await userRepo.save(user);

  res.json({ message: "이메일 인증 완료" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userRepo = AppDataSource.getRepository(User);

  const user = await userRepo.findOneBy({ username });
  if (!user) return res.status(400).json({ message: "User not found" });
  if (!user.isVerified) return res.status(400).json({ message: "Email not verified" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
  res.json({ token });
});

export default router;