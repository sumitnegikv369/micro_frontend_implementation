import { addToCart } from "cart/public-api";

export default ({ id }) => {
    return (
        <div className="mt-2 text-sm w-full">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded-md w-full" onClick={()=>addToCart(id)}>
            Add to cart
        </button>
    </div>
    )
}