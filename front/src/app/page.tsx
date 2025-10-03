import axios from "axios";
import Link from "next/link";

export default async function Home() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/posts`);
  const posts = res.data;

  return (
    <div>
      <Link href={"/posts/new"}>새 글 작성</Link>
      <h2>게시글 목록</h2>
      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
