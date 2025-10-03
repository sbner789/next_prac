import axios from "axios";
import Link from "next/link";

type Props = {
    params: { id: string };
};

const PostDetailPage = async ({ params }: Props) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/posts/${params.id}`);
    const post = res.data;

    if (!post) return <p>게시글이 없습니다.</p>;

    return (
        <div>
            <Link href="/">← 목록으로</Link>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <small>
                생성: {new Date(post.createdAt).toLocaleString()} / 수정: {new Date(post.updatedAt).toLocaleString()}
            </small>
        </div>
    );
}
export default PostDetailPage;