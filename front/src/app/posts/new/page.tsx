"use client"; // ✅ 클라이언트 컴포넌트임을 선언

import { useState } from "react"
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const NewPostPage = () => {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/posts`, { title, content });
        router.push("/");
    };

    return (
        <div>
            <Link href={"/"}>← 목록으로</Link>
            <h2>새 글 작성</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목" required />
                </div>
                <div>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="내용" required />
                </div>
                <button type="submit">작성</button>
            </form>
        </div>
    )
}
export default NewPostPage;
