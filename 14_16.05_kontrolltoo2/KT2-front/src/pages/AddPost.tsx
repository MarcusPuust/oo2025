import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import type { User } from "../models/User";

function AddPost() {
  const [users, setUsers] = useState<User[]>([]);
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLInputElement>(null);
  const userRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then(res => res.json())
      .then(json => setUsers(json));
  }, []);

  const addPost = () => {
    const post = {
      title: titleRef.current?.value,
      body: bodyRef.current?.value,
      user: {
        id: Number(userRef.current?.value)
      }
    };

    fetch("http://localhost:8080/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post)
    })
      .then(res => res.json())
      .then(() => {
        toast.success("Postitus lisatud!");
        if (titleRef.current) titleRef.current.value = "";
        if (bodyRef.current) bodyRef.current.value = "";
      });
  };

  return (
    <div className="container mt-4 narrow-container">
      <h3 className="page-title">Lisa postitus</h3>
      <input ref={titleRef} placeholder="Pealkiri" className="form-control" />
      <input ref={bodyRef} placeholder="Sisu" className="form-control" />
      <select ref={userRef} className="form-select">
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
      <button onClick={addPost} className="btn btn-success">Lisa</button>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default AddPost;


