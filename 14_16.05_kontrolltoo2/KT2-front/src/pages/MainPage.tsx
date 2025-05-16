import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import type { Post } from "../models/Post";

function MainPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("title,asc");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [size, setSize] = useState(5);

  const inputRef = useRef<HTMLInputElement>(null);
  const sizeRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/posts/search?keyword=${keyword}&page=${page}&size=${size}&sort=${sort}`)
      .then(res => res.json())
      .then(json => {
        setPosts(json.content);
        setTotalPages(json.totalPages);
      });
  }, [keyword, page, sort, size]);

  const handleSearchChange = () => {
    const value = inputRef.current?.value || "";
    setKeyword(value);
    setPage(0);
  };

  return (
    <div className="container mt-4">
      <h3>Postitused</h3>

      <input
        ref={inputRef}
        onChange={handleSearchChange}
        className="form-control mb-3"
        placeholder="Otsi pealkirja järgi..."
      />

      <div className="mb-3 d-flex align-items-center gap-3 flex-wrap">
        <label htmlFor="sizeSelect">Postitusi lehel:</label>
        <select
          ref={sizeRef}
          id="sizeSelect"
          className="form-select w-auto"
          defaultValue={size}
          onChange={() => {
            setSize(Number(sizeRef.current?.value));
            setPage(0);
          }}
        >
          <option value={1}>1</option>
          <option value={3}>3</option>
          <option value={5}>5</option>
        </select>

        <button className="btn btn-outline-primary" onClick={() => setSort("title,asc")}>Sorteeri A–Z</button>
        <button className="btn btn-outline-primary" onClick={() => setSort("title,desc")}>Sorteeri Z–A</button>
      </div>

      {posts.map(post => (
        <div key={post.id} className="mb-3 border-bottom pb-2">
          <strong>{post.title}</strong>
          <Link to={`/post/${post.id}`}>
            <button className="btn btn-sm btn-primary ms-2">Vaata</button>
          </Link>
        </div>
      ))}

      <div className="d-flex gap-3 mt-4">
        <button className="btn btn-secondary" disabled={page === 0} onClick={() => setPage(page - 1)}>Eelmine</button>
        <span>Leht {page + 1} / {totalPages}</span>
        <button className="btn btn-secondary" disabled={page + 1 >= totalPages} onClick={() => setPage(page + 1)}>Järgmine</button>
      </div>
    </div>
  );
}

export default MainPage;


