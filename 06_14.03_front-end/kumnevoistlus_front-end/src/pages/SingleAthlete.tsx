import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import { Athlete } from "../models/Athletes";

function SingleAthlete() {
  const { athleteId } = useParams();
  const [athlete, setAthlete] = useState<Athlete>();
  const navigate = useNavigate(); // ← kasuta navigate

  useEffect(() => {
    fetch("http://localhost:8080/athletes/" + athleteId)
      .then(res => res.json())
      .then(json => setAthlete(json));
  }, [athleteId]);

  if (!athlete) {
    return <div>Laen sportlase andmeid...</div>;
  }

  return (
    <div>
      <button onClick={() => navigate(-1)}>Tagasi</button> 
      <br /><br />

      <div>Name: {athlete.name}</div>
      <div>Country: {athlete.country}</div>
      <div>Age: {athlete.age}</div>
      <div>Total Points: {athlete.totalPoints}</div>
    </div>
  );
}

export default SingleAthlete;
