import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Post } from "../models/Post";

function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState<Post>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:8080/posts/${id}`)
      .then(res => res.json())
      .then(json => setPost(json));
  }, [id]);

  if (!post) return <div>Laen...</div>;

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>← Tagasi</button>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <p><strong>Kasutaja:</strong> {post.user?.name}</p>
    </div>
  );
}

export default SinglePost;

