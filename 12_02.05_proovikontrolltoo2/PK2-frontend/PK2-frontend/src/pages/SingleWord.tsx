import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Word } from "../models/Word";

function SingleWord() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [word, setWord] = useState<Word | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/words/${id}`)
      .then(res => res.json())
      .then(json => setWord(json));
  }, [id]);

  if (!word) {
    return <div>Laen...</div>;
  }

  return (
    <div className="full-center">
      <h2>Sõna detail</h2>
      <div><strong>Sõna:</strong> {word.type}</div>
      <div><strong>Tähendus:</strong> {word.description}</div>
      <button className="btn btn-secondary mt-4" onClick={() => navigate("/")}>
        ← Tagasi
      </button>
    </div>
  );
}

export default SingleWord;
