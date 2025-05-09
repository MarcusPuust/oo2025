import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Word } from '../models/Word';

function SingleWord() {
  const { wordId } = useParams();
  const navigate = useNavigate();
  const [word, setWord] = useState<Word>();

  useEffect(() => {
    fetch(`http://localhost:8080/words/${wordId}`)
      .then(res => res.json())
      .then(json => setWord(json));
  }, [wordId]);

  return (
    <div className="container mt-4">
      {/* ← Tagasi nupp */}
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ← Tagasi
      </button>

      {/* Sõna detailid */}
      <h2>{word?.type}</h2>
      <p>{word?.description}</p>
    </div>
  );
}

export default SingleWord;
