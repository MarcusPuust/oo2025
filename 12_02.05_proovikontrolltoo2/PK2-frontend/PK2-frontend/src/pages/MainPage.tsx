import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import type { Word } from '../models/Word';


function MainPage() {
    const [words, setWords] = useState<Word[]>([]);
  
    const typeRef = useRef<HTMLInputElement>(null);
    const descRef = useRef<HTMLInputElement>(null);
  
    useEffect(() => {
      fetch("http://localhost:8080/words")
        .then(res => res.json())
        .then(json => setWords(json));
    }, []);
  
    const addWord = () => {
      const newWord = {
        type: typeRef.current?.value,
        description: descRef.current?.value,
      };
  
      fetch("http://localhost:8080/words", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWord),
      })
        .then(res => res.json())
        .then(json => {
          setWords(json);
          if (typeRef.current) typeRef.current.value = "";
          if (descRef.current) descRef.current.value = "";
        });
    };
  
    return (
        <div className="full-center">
          <h2>Sõnastik</h2>
      
          {/* Lisa uus sõna vorm – ENNE */}
          <div className="mt-4">
            <h4>Lisa uus sõna</h4>
            <input type="text" ref={typeRef} placeholder="Sõna" className="form-control mb-2" />
            <input type="text" ref={descRef} placeholder="Tähendus" className="form-control mb-2" />
            <button className="btn btn-success" onClick={addWord}>Lisa</button>
          </div>
      
          {/* Sõnade nimekiri – PÄRAST */}
          <div className="mt-5">
            {words.map(word => (
              <div key={word.typeID} className="mb-2">
                <strong>{word.type}</strong>
                <Link to={`/word/${word.typeID}`}>
                  <button className="btn btn-primary btn-sm ms-2">Vaata lähemalt</button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      );
      
  }
  
  export default MainPage;

