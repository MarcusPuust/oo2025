// Results.tsx
import { useEffect, useRef, useState } from "react";
import { Result } from "../models/Results";
import { Athlete } from "../models/Athletes";
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

function Results() {
  const [results, setResults] = useState<Result[]>([]);
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [selectedAthleteId, setSelectedAthleteId] = useState<number | null>(null);

  const eventRef = useRef<HTMLInputElement>(null);
  const scoreRef = useRef<HTMLInputElement>(null);
  const pointsRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("http://localhost:8080/athletes")
      .then(res => res.json())
      .then(json => setAthletes(json));
  }, []);

  useEffect(() => {
    if (selectedAthleteId !== null) {
      fetch("http://localhost:8080/results")
        .then(res => res.json())
        .then(json => {
          const filtered = json.filter((r: Result) => r.athlete.id === selectedAthleteId);
          setResults(filtered);
        });
    } else {
      setResults([]);
    }
  }, [selectedAthleteId]);

  const deleteResult = (id: number) => {
    fetch(`http://localhost:8080/results/${id}`, { method: "DELETE" })
      .then(() => setResults(results.filter(result => result.id !== id)));
  };

  const addResult = () => {
    if (selectedAthleteId === null) {
      toast.error("Palun vali sportlane enne tulemuse lisamist.");
      return;
    }

    const newResult = {
      event: eventRef.current?.value,
      score: scoreRef.current?.value,
      points: Number(pointsRef.current?.value),
      athlete: { id: selectedAthleteId }
    };

    fetch("http://localhost:8080/results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newResult)
    })
      .then(res => res.json())
      .then(json => {
        if (json.message === undefined && json.timestamp === undefined && json.status === undefined) {
          // refresh results
          const filtered = json.filter((r: Result) => r.athlete.id === selectedAthleteId);
          setResults(filtered);
          toast.success("Result added successfully!");
        } else {
          toast.error(json.message);
        }
      });
  };

  return (
    <div className="container mt-4">
    <h2>Results Management</h2>

      <div className="mb-3">
        <label className="form-label">Choose athlete</label>
        <select
          className="form-select"
          onChange={(e) => setSelectedAthleteId(Number(e.target.value))}
          value={selectedAthleteId ?? ''}
        >
          <option value="" disabled>-- Choose athlete --</option>
          {athletes.map(athlete => (
            <option key={athlete.id} value={athlete.id}>{athlete.name}</option>
          ))}
        </select>
      </div>

      {selectedAthleteId !== null && (
        <>
          <div className="mb-4">
            <label className="form-label">Event</label>
            <input ref={eventRef} type="text" className="form-control" />

            <label className="form-label mt-2">Score</label>
            <input ref={scoreRef} type="text" className="form-control" />

            <label className="form-label mt-2">Points</label>
            <input ref={pointsRef} type="number" className="form-control" />

            <button className="btn btn-light mt-3" onClick={addResult}>Add result</button>
          </div>

          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Event</th>
                <th>Score</th>
                <th>Points</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {results.map(result => (
                <tr key={result.id}>
                  <td>{result.event}</td>
                  <td>{result.score}</td>
                  <td>{result.points}</td>
                  <td>
                    <button className="btn btn-light btn-sm" onClick={() => deleteResult(result.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <ToastContainer />
    </div>
  );
}

export default Results;

