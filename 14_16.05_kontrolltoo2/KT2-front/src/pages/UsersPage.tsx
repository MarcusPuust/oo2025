import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { User } from "../models/User";
import { ToastContainer, toast } from "react-toastify";

function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then(res => res.json())
      .then(json => setUsers(json));
  }, []);

  const addUser = () => {
    const newUser = {
      name: nameRef.current?.value
    };

    fetch("http://localhost:8080/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(json => {
        setUsers(json);
        toast.success("Kasutaja lisatud!");
        if (nameRef.current) nameRef.current.value = "";
      });
  };

  return (
    <div className="container mt-4 narrow-container">
      <h3 className="page-title">Kasutajad</h3>

      <div>
        <label className="form-label">Nimi</label>
        <input ref={nameRef} type="text" className="form-control" />
      </div>

      <button onClick={addUser} className="btn btn-success mb-4">Lisa kasutaja</button>

      <ul className="list-group">
        {users.map(user => (
          <li key={user.id} className="list-group-item">
            <span>{user.name}</span>
            <Link to={`/user/${user.id}`} className="btn btn-primary btn-sm">Vaata postitusi</Link>
          </li>
        ))}
      </ul>

      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default UsersPage;

