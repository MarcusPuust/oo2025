import { useEffect, useState } from 'react'
import { Category } from '../models/Category'; // ../ --> kausta võrra ülespoole
import { Product } from '../models/Product';
function MainPage() {
    //Muutuja - HTML muudab muutujat + HTMLi sulgude sees - algväärtus
  const [kategooriad, setKategooriad] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);


  //uef -> onload
  useEffect(() => {
    fetch("http://localhost:8080/categories") //api otspunkt kuhu läheb päring
        .then(res=>res.json()) //kogu tagastus: headers, status code
        .then(json=> setKategooriad(json)) // body: sisu, mida tagastab meile back-end
    
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/products") //api otspunkt kuhu läheb päring
        .then(res=>res.json()) //kogu tagastus: headers, status code
        .then(json=> setProducts(json)) // body: sisu, mida tagastab meile back-end
    
  }, []);
    
  return (
    <div>
         {kategooriad.map(kategooria =>
       <div key={kategooria.id}>
        {kategooria.name} {kategooria.active}
        </div> )}
      <br />
      <br />
      {products.map(product =>
       <div key={product.id}>
        <div>{product.id}</div>
        <div>{product.name}</div>
        <div>{product.price}</div>
        <div>{product.image}</div>
        <div>{product.category?.name}</div>
        {/* <div>{product.active}</div> kõik mis siin all on välja kuvamise eesmärgiga*/}
        </div> )}
    </div>
  )
}

export default MainPage