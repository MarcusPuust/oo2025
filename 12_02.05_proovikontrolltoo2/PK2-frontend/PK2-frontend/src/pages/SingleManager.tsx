import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Word } from '../models/Word';
import type { Manager } from '../models/Manager';

function SingleManager() {
  const { ManagerId } = useParams();
  const navigate = useNavigate();
  const [words, setWords] = useState<Word[]>([]);
  const [manager, setManager] = useState<Manager>();

  useEffect(() => {
    if (!ManagerId) return;

    fetch(`http://localhost:8080/manager/${ManagerId}`)
      .then(res => res.json())
      .then(json => setManager(json));

    fetch(`http://localhost:8080/words-manager?managerId=${ManagerId}`)
      .then(res => res.json())
      .then(json => setWords(json.content || json)); 
  }, [ManagerId]);

  return (
    <div className="container mt-4">
      {/* ← Tagasi nupp */}
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ← Tagasi
      </button>

      <h2>Sõnad haldajalt: {manager?.name}</h2>
      {words.map(word => (
        <div key={word.id}>
          <strong>{word.type}</strong> – {word.description}
        </div>
      ))}
    </div>
  );
}

export default SingleManager;
