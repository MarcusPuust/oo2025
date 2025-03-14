import { useEffect, useState } from 'react';
import './App.css';
import { Category } from './models/Category';
import { Product } from './models/Product';

function App() {
  const sonad = ["Elas", "metsas", "mutionu"];
  const autod = [
    {"mark": "BMW", "mudel": "i5", "year": 2015},
    {"mark": "Audi", "mudel": "TT", "year": 2016},
    {"mark": "Mercedes", "mudel": "S", "year": 2014},
    {"mark": "VW", "mudel": "Golf", "year": 2012}
  ];

  const [kategooriad, setKategooriad] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/categories')
      .then(res => res.json())
      .then(json => setKategooriad(json))
      .catch(error => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/products')
      .then(res => res.json())
      .then(json => {
        console.log(json); // Kontrollime andmeid konsoolis
        setProducts(json);
      })
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  return (
    <>
      {sonad.map(sona => 
        <div key={sona}>{sona}</div>
      )}
      <br /><br />
      {autod.map(auto => 
        <div key={auto.mark + auto.mudel}>{auto.mark} - {auto.mudel} ({auto.year})</div>
      )}
      <br /><br />
      {kategooriad.map(kategooria => 
        <div key={kategooria.id}>{kategooria.name} {kategooria.active?.toString()}</div>
      )}
      <br /><br />
      {products.map(product => 
        <div key={product.id}>
          <div>{product.id}</div>
          <div>{product.name}</div>
          <div>{product.price}</div>
          <div>{product.image}</div>
          <div>{product.category?.name}</div>
        </div>
      )}
    </>
  );
}

export default App;

