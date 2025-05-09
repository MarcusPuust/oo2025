import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Word } from "../models/Word";

function EditWord() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [word, setWord] = useState<Word | null>(null);

  const typeRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/words/${id}`)
      .then(res => res.json())
      .then(json => setWord(json));
  }, [id]);

  const updateWord = () => {
    const updated = {
      typeID: Number(id),
      type: typeRef.current?.value,
      description: descRef.current?.value,
    };

    fetch("http://localhost:8080/words", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updated),
    })
      .then(res => res.json())
      .then(() => navigate("/")); // suuna tagasi avalehele
  };

  if (!word) {
    return <div>Laen andmeid...</div>;
  }

  return (
    <div className="full-center">
      <h2>Muuda sõna</h2>
      <input
        type="text"
        defaultValue={word.type}
        ref={typeRef}
        className="form-control mb-2"
      />
      <input
        type="text"
        defaultValue={word.description}
        ref={descRef}
        className="form-control mb-2"
      />
      <button className="btn btn-primary" onClick={updateWord}>
        Salvesta muudatused
      </button>
      <button className="btn btn-secondary mt-4" onClick={() => navigate("/")}>
        ← Tagasi
      </button>
    </div>
  );
}

export default EditWord;
