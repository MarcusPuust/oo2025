import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Word } from "../models/Word";
import type { Manager } from "../models/Manager";
import { ToastContainer, toast } from "react-toastify";

function EditWord() {
  const { wordId } = useParams();
  const navigate = useNavigate();
  const [word, setWord] = useState<Word>();
  const [managers, setManagers] = useState<Manager[]>([]);

  const typeRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const managerRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/words/${wordId}`)
      .then(res => res.json())
      .then(json => setWord(json));
  }, [wordId]);

  useEffect(() => {
    fetch("http://localhost:8080/manager")
      .then(res => res.json())
      .then(json => setManagers(json));
  }, []);

  const editWord = () => {
    const modifiedWord = {
      id: wordId,
      type: typeRef.current?.value,
      description: descriptionRef.current?.value,
      manager: {
        id: Number(managerRef.current?.value)
      }
    };

    fetch("http://localhost:8080/words", {
      method: "PUT",
      body: JSON.stringify(modifiedWord),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.message && json.status && json.timestamp) {
          toast.error(json.message);
        } else {
          navigate("/manage/words");
        }
      });
  };

  if (!word) return <div>Sõna ei leitud</div>;

  return (
    <div>
      <h3>Muuda sõna</h3>
      <label>Sõna</label><br />
      <input ref={typeRef} defaultValue={word.type} type="text" /> <br />
      <label>Tähendus</label><br />
      <input ref={descriptionRef} defaultValue={word.description} type="text" /> <br />
      <label>Haldaja</label><br />
      <select ref={managerRef} defaultValue={word.manager?.id}>
        {managers.map(manager => (
          <option key={manager.id} value={manager.id}>
            {manager.name}
          </option>
        ))}
      </select><br />
      <button onClick={editWord}>Salvesta</button>
      <ToastContainer />
    </div>
  );
}

export default EditWord;