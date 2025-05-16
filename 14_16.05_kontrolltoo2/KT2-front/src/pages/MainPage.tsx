import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Post } from "../models/Post";

function MainPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/posts")
      .then(res => res.json())
      .then(json => setPosts(json));
  }, []);

  return (
    <div className="container mt-4">
      <h3>Postitused</h3>
      {posts.map(post => (
        <div key={post.id} className="mb-3 border-bottom pb-2">
          <strong>{post.title}</strong>
          <Link to={`/post/${post.id}`}>
            <button className="btn btn-sm btn-primary ms-2">Vaata</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default MainPage;
