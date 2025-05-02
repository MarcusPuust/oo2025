import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import { Product } from '../models/Product';
//rfce
function SingleProduct() {
    //<Route path="/product/:productId" element={<SingleProduct/>} />
    //kui on kooloni taga productId, siis peab olema siin productId
  const {productId} = useParams();
  // window.location.href.split("/product/")[1] --> tavalises JavaScript 
  const [product, setProduct] = useState<Product>();// {} on tühi objekt, et ei tuleks errorit, kui productId pole olemas

  // uef. midagi ei läheks korduvalt käima. Korduma läheb käima, kui mõni muutuja dependecy array sees muutub
  useEffect(() => {
     fetch("http://localhost:8080/products/" + productId) // API otspunkt kuhu läheb päring
       .then(res=>res.json())
       .then(json => setProduct(json))
  }, [productId]);
  
  return (
    <div>
        <div>Nimi: {product?.name}</div>
        <div>Hind: {product?.price}</div>
        <div>Kategooria: {product?.category?.name}</div>
        <img src={product?.image} alt="" />
    </div>
  )
}

export default SingleProduct