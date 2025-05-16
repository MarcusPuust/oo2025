import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Post } from "../models/Post";
import type { User } from "../models/User";

function UserPosts() {
  const { id } = useParams();
  const [user, setUser] = useState<User>();
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/users/${id}`)
      .then(res => res.json())
      .then(json => setUser(json));

    fetch(`http://localhost:8080/users/${id}/posts`)
      .then(res => res.json())
      .then(json => setPosts(json));
  }, [id]);

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>← Tagasi</button>
      <h3>Postitused kasutajalt: {user?.name}</h3>
      <ul className="list-group">
        {posts.map(post => (
          <li key={post.id} className="list-group-item">
            <strong>{post.title}</strong><br />
            {post.body}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserPosts;

