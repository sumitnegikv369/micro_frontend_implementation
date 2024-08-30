import 'tailwindcss/tailwind.css';
import { useEffect, useRef, useState } from "react";
import { getProductById, currency } from "shell/public-api";
import { useParams } from "react-router-dom";
import placeAddToCart from "addtocart/placeAddToCart";

const PDP = () => {
    const {id} = useParams();
    console.log(id);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      getProductById(id).then(setProduct);
    } else {
      setProduct(null);
    }
  }, [id]);
  const addToCart = useRef(null);
  useEffect(()=>{
    if(addToCart.current){
      placeAddToCart(addToCart.current, product.id)
    }
  }, [product])
  if (!product) return null;

  return (
    <div className="flex justify-center mx-12 my-10 gap-4 bg-gray-300/30 p-8 h-[80%]">
      <div>
        <img src={product.image} alt={product.name} className="rounded-md" />
      </div>
      <div className="flex flex-col justify-start items-start gap-4">
        <h1 className="font-bold text-3xl">{product.name}</h1>
        <div className="font-bold text-3xl text-green-800 font-mono">
          {currency.format(product.price)}
        </div>
        <div ref={addToCart}></div>
      <div className="">{product.description}</div>
      <div className="w-1/2 text-justify">{product.longDescription}</div>
      </div>
    </div>
  );
};
export default PDP;
