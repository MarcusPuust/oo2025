import { useEffect, useRef, useState } from "react";
import { Result } from "../models/Results";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function EditResult() {
  const { resultId } = useParams();
  const [result, setResult] = useState<Result>();
  const navigate = useNavigate();

  const eventRef = useRef<HTMLInputElement>(null);
  const scoreRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("http://localhost:8080/results/" + resultId)
      .then(res => res.json())
      .then(json => setResult(json));
  }, [resultId]);

  const editResult = () => {
    const modifiedResult = {
      id: Number(resultId),
      event: eventRef.current?.value,
      score: Number(scoreRef.current?.value),
      athlete: { id: result?.athlete.id }
    };

    fetch("http://localhost:8080/results", {
      method: "PUT",
      body: JSON.stringify(modifiedResult),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(() => {
        navigate("/results");
      });
  };

  if (result === undefined) {
    return <div>Result not found</div>;
  }

  return (
    <div>
      <button onClick={() => navigate(-1)}>Tagasi</button>
      <br /><br />
      <label>Event</label> <br />
      <input ref={eventRef} defaultValue={result.event} type="text" /> <br />
      <label>Score</label> <br />
      <input ref={scoreRef} defaultValue={result.score} type="text" /> <br />
      <br />
      <button onClick={editResult}>Muuda tulemust</button>
      <ToastContainer />
    </div>
  );
}

export default EditResult;
