import { useEffect, useState } from "react";
import { Category } from "../models/Category";
import "./ManageCategories.css";


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
    })
      .then(res => res.json())
      .then(json => setKategooriad(json));
  };

  return (
    <div className="manage-categories">
      <h2>Manage categories</h2>
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
    </div>
  );
}
export default ManageCategories