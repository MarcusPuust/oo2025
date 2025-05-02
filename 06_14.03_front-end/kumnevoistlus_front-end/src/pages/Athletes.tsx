import { useEffect, useRef, useState } from "react";
import { Athlete } from "../models/Athletes";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";

function Athletes() {

    const [athletes, setAthletes] = useState<Athlete[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/athletes")
            .then(res=>res.json())
            .then(json=> setAthletes(json))
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
            if (json.message === undefined && json.timestamp === undefined && json. status === undefined) {
                setAthletes(json)
                toast.success("Athlete added successfully!");
                } else {
                    toast.error(json.message);
                }
        });
    };


    return (
        <div>
            <h2>Athletes</h2>
            <label>Name</label> <br />
            <input ref={nameRef} type="text"/> <br />
            <label>Country</label> <br />
            <input ref={countryRef} type="text"/> <br />
            <label>Age</label> <br />
            <input ref={ageRef} type="text"/> <br />
            <label>Total points</label> <br />
            <input ref={totalPointsRef} type="number"/> <br />
            <br />
            <button onClick={() => addAthlete()}>Add athlete</button>
            <br /><br />
            <table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Country</th>
      <th>Age</th>
      <th>Total Points</th>
      <th>Delete</th> 
      <th>Edit</th>   
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
          <button onClick={() => deleteAthlete(athlete.id)}>Delete</button>
        </td>
        <td>
          <Link to={"/edit-athlete/" + athlete.id}>
            <button>Edit</button>
          </Link>
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