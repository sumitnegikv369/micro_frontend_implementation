import 'tailwindcss/tailwind.css';
import { useEffect, useState } from "react";
import { getProducts, currency } from "shell/public-api";
import { addToCart } from "cart/public-api";
import { Link } from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        getProducts().then(setProducts);
    }, []);

    return <div className="grid grid-cols-4 gap-5 m-4">
        {products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="m-4 rounded-md overflow-hidden cursor-pointer transition-all duration-300 ease-in-out hover:scale-105">
                <img src={product.image} alt={product.name} className="aspect-square"/>
                <div className="flex text-sm my-2 mx-1">
                    <div className="flex-grow font-bold">{product.name}
                    </div>
                    <div className="flex-end font-mono text-green-800">{currency.format(product.price)}</div>
                </div>
                <div className="mt-2 text-sm w-full">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded-md w-full" onClick={()=>addToCart(product.id)}>
                            Add to cart
                        </button>
                    </div>
            </Link>
        ))}
    </div>
}
export default Products