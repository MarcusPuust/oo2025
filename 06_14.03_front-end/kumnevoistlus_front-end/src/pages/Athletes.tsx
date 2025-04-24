// Athletes.tsx
import { useEffect, useRef, useState } from "react";
import { Athlete } from "../models/Athletes";
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

function Athletes() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/athletes")
      .then(res => res.json())
      .then(json => setAthletes(json));
  }, []);

  const deleteAthlete = (id: number) => {
    fetch(`http://localhost:8080/athletes/${id}`, { method: "DELETE" })
      .then(() => setAthletes(athletes.filter(athlete => athlete.id !== id)));
  };

  const nameRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const totalPointsRef = useRef<HTMLInputElement>(null);

  const addAthlete = () => {
    const newAthlete = {
      name: nameRef.current?.value,
      country: countryRef.current?.value,
      age: Number(ageRef.current?.value),
      totalPoints: Number(totalPointsRef.current?.value)
    };
    fetch(`http://localhost:8080/athletes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAthlete)
    })
      .then(res => res.json())
      .then(json => {
        if (json.message === undefined && json.timestamp === undefined && json.status === undefined) {
          setAthletes(json);
          toast.success("Athlete added successfully!");
        } else {
          toast.error(json.message);
        }
      });
  };

  return (
    <div className="container mt-4">
    <h2>Athlete Management</h2>

      <div className="mb-4">
        <label className="form-label">Name</label>
        <input ref={nameRef} type="text" className="form-control" />

        <label className="form-label mt-2">Country</label>
        <input ref={countryRef} type="text" className="form-control" />

        <label className="form-label mt-2">Age</label>
        <input ref={ageRef} type="number" className="form-control" />

        <label className="form-label mt-2">Total points</label>
        <input ref={totalPointsRef} type="number" className="form-control" />

        <button className="btn btn-light mt-3" onClick={addAthlete}>Add athlete</button>
      </div>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Age</th>
            <th>Total Points</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {athletes.map(athlete => (
            <tr key={athlete.id}>
              <td>{athlete.name}</td>
              <td>{athlete.country}</td>
              <td>{athlete.age}</td>
              <td>{athlete.totalPoints}</td>
              <td>
                <button className="btn btn-light btn-sm" onClick={() => deleteAthlete(athlete.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer />
    </div>
  );
}

export default Athletes;
