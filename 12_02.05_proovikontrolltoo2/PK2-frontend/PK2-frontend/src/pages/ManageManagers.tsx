import { useRef, useState, useEffect } from 'react';
import type { Manager } from '../models/Manager';
import { ToastContainer, toast } from 'react-toastify';

function ManageManagers() {
  const [managers, setManagers] = useState<Manager[]>([]);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("http://localhost:8080/manager")
      .then(res => res.json())
      .then(json => setManagers(json));
  }, []);

  const addManager = () => {
    const newManager = {
      name: nameRef.current?.value,
    };

    fetch("http://localhost:8080/manager", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newManager)
    })
      .then(res => res.json())
      .then(json => {
        setManagers(json);
        toast.success("Haldaja lisatud!");
        if (nameRef.current) nameRef.current.value = "";
      });
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h3 className="mb-3">Haldajate haldus</h3>

      <div className="mb-3">
        <label className="form-label">Nimi</label>
        <input ref={nameRef} type="text" className="form-control" />
      </div>

      <button onClick={addManager} className="btn btn-success mb-4">Lisa haldaja</button>

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Nimi</th>
          </tr>
        </thead>
        <tbody>
          {managers.map(manager => (
            <tr key={manager.id}>
              <td>{manager.id}</td>
              <td>{manager.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default ManageManagers;
