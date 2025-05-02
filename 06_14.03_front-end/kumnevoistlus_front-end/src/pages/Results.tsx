import { useEffect, useRef, useState } from "react";
import { Result } from "../models/Results";
import { Athlete } from "../models/Athletes";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";

function Results() {
  const [results, setResults] = useState<Result[]>([]);
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [selectedAthleteId, setSelectedAthleteId] = useState<number | null>(null);

  const eventRef = useRef<HTMLInputElement>(null);
  const scoreRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("http://localhost:8080/results")
      .then(res => res.json())
      .then(json => setResults(json));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/athletes")
      .then(res => res.json())
      .then(json => setAthletes(json));
  }, []);

  const deleteResult = (id: number) => {
    fetch(`http://localhost:8080/results/${id}`, { method: "DELETE" })
      .then(() => setResults(results.filter(result => result.id !== id)));
  };

  const addResult = () => {
    if (selectedAthleteId === null) {
      toast.error("Palun vali sportlane!");
      return;
    }

    const newResult = {
      event: eventRef.current?.value,
      score: Number(scoreRef.current?.value),
      athlete: { id: selectedAthleteId }
    };

    fetch(`http://localhost:8080/results`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newResult)
    })
      .then(res => res.json())
      .then(json => {
        if (json.message === undefined && json.timestamp === undefined && json.status === undefined) {
          setResults(json);
          toast.success("Tulemus lisatud edukalt!");
        } else {
          toast.error(json.message);
        }
      });
  };

  const filteredResults = selectedAthleteId === null
    ? []
    : results.filter(result => result.athlete.id === selectedAthleteId);

  return (
    <div>
      <h2>Results</h2>

      {/* Üleval sportlase valik ja add nupp */}
      <label>Vali sportlane</label>
      <select onChange={(e) => {
        const value = e.target.value;
        setSelectedAthleteId(value ? Number(value) : null);
      }}>
        <option value="">-- Vali sportlane --</option>
        {athletes.map(athlete => (
          <option key={athlete.id} value={athlete.id}>
            {athlete.name}
          </option>
        ))}
      </select>

      {/* Näitame lisamise vormi ainult kui sportlane on valitud */}
      {selectedAthleteId !== null && (
        <>
          <br />
          <label>Event</label> <br />
          <input ref={eventRef} type="text" /> <br />
          <label>Score</label> <br />
          <input ref={scoreRef} type="text" /> <br />
          <br />
          <button onClick={addResult}>Add result</button>
          <br /><br />
        </>
      )}

      {/* Kui sportlane valitud, näita tema tulemusi */}
      {selectedAthleteId !== null ? (
        <table>
          <thead>
            <tr>
              <th>Athlete</th>
              <th>Event</th>
              <th>Score</th>
              <th>Points</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredResults.map(result => (
              <tr key={result.id}>
                <td>{result.athlete.name}</td>
                <td>{result.event}</td>
                <td>{result.score}</td>
                <td>{result.points}</td>
                <td>
                  <button onClick={() => deleteResult(result.id)}>Delete</button>
                  <Link to={"/edit-result/" + result.id}>
                    <button>Edit</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>Palun vali sportlane tulemuste vaatamiseks.</div>
      )}
      
      <ToastContainer />
    </div>
  );
}

export default Results;
