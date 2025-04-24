import { useEffect, useRef, useState } from "react";
import { Category } from "../models/Category";
import "../App.css";
import { ToastContainer, toast } from 'react-toastify';


function ManageCategories() {

  //muutuja - HTML   muudab muutujat + HTMLi  sulgude sees - algväärtus  senikaua kuni võtab api otspunktist
  const [kategooriad, setKategooriad] = useState<Category[]>([]);


  //uef -> onload
  useEffect(() => {
    fetch("http://localhost:8080/categories") //Api otspunkt kuhu läheb päring
        .then(res=>res.json()) //kogu tagastus: headers, status code,
        .then(json=> setKategooriad(json)) //body: sisu, mida tagastab back-end
  }, []);

  // Delete category by ID and update the list with the returned result
  const deleteCategory = (id: number) => {
    fetch(`http://localhost:8080/categories/${id}`, {
      method: "DELETE"
    }).then(res => res.json()) 
    .then(json => {
      if(json.message === undefined && json.timestamp === undefined 
                      && json.status === undefined) {
      setKategooriad(json);
      toast.success("Kategooria kustutatud!");
      } else {
      toast.error(json.message);
      }
    });
  };

  const nameRef = useRef<HTMLInputElement>(null);
  const activeRef = useRef<HTMLInputElement>(null);
  
  
  const addCategory = () => {
    const newCategory = {name: nameRef.current?.value, 
                      active: activeRef.current?.checked}
  
    fetch("http://localhost:8080/categories", {
      method: "POST",
      body: JSON.stringify(newCategory),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res=>res.json())
      .then(json=> {
        if (json.message === undefined && json.timestamp === undefined 
                        && json.status === undefined) {
          setKategooriad(json);
          toast.success("Uus kategooria lisatud!");
          if (nameRef.current && activeRef.current) {
            nameRef.current.value = "";
            activeRef.current.checked = false;
          }
        } else {
          toast.error(json.message);
        }
      })
  }

  return (
    <div className="manage-categories">
      <h2>Manage categories</h2>
      <label>Name</label> <br />
      <input ref={nameRef} type="text" /> <br />
      <label>Active</label> <br />
      <input ref={activeRef} type="checkbox" /> <br />
      <button onClick={() => addCategory()}>Add</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Active</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {kategooriad.map(kategooria => (
            <tr key={kategooria.id}>
              <td>{kategooria.id}</td>
              <td>{kategooria.name}</td>
              <td>{kategooria.active ? "True" : "False"}</td>
              <td>
                <button onClick={() => deleteCategory(kategooria.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}
export default ManageCategories