import { useEffect, useRef, useState } from "react";
import { Product } from "../models/Product";
import "../App.css";
import { Category } from "../models/Category";
import { ToastContainer, toast } from 'react-toastify';

function ManageProducts() {


  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  //Andmebaasist toodete laadminine
  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then(res => res.json())
      .then(json => setProducts(json));
  }, []);


  useEffect(() => {
    fetch("http://localhost:8080/categories")
      .then(res => res.json())
      .then(json => setCategories(json));
  }, []);

  //Toote kustutamine ID alusel
  const deleteProduct = (id: number) => {
    fetch(`http://localhost:8080/products/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json()) 
      .then(json => setProducts(json));
  };

  //document.getElementById("name").value
  //nameRef.current?.value

  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const activeRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);

  const addProduct = () => {
    const newProduct = {
      name: nameRef.current?.value,
      price: Number(priceRef.current?.value), // kui on numbriline väärtus, siis peaksin Number() ümber panema
      iamge: imageRef.current?.value,
      active: activeRef.current?.checked, // kui on checkbox, siis ei ole .value (muidu annab "on")
      category: {"id": Number(categoryRef.current?.value)}
    }

    fetch(`http://localhost:8080/products`, {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json()) 
      .then(json => {
        if(json.message === undefined && json.timestamp === undefined 
                        && json.status === undefined) {
        setProducts(json);
        toast.success("Uus toode on lisatud!");
        } else {
        toast.error(json.message);
        }
      });
  };
  
  

  return (
    <div className="manage-products">
      <h2>Manage products</h2>

      <label>Name</label> <br />
      <input ref={nameRef} type="text" /> <br />
      <label>Price</label> <br />
      <input ref={priceRef} type="number" /> <br />
      <label>Image</label> <br />
      <input ref={imageRef} type="text" /> <br />
      <label>Active</label> <br />
      <input ref={activeRef} type="checkbox" /> <br />
      <label>Category</label> <br />
      {/* <input ref={categoryRef} type="number" /> <br /> */}
      <select ref={categoryRef}>
        {categories.map(category => <option value={category.id}>{category.name}</option>)}
      </select>
      <br />
      <button onClick={() => addProduct()}>Add product</button>
      



      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Category</th>
            <th>Action</th> {} 
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.image}</td>
              <td>{product.category?.name || "No category"}</td>
              <td>
                <button onClick={() => deleteProduct(product.id)}>
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

export default ManageProducts;