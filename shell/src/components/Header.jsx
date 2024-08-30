import 'tailwindcss/tailwind.css';
import Cart from 'cart/cart'
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-teal-500 py-2 shadow-md">
      <div className="container px-10 flex items-center justify-between mx-auto">
        <h1 className="text-white text-2xl font-extrabold">Shop Now</h1>

        <nav className='flex items-center gap-2 text-md text-white font-bold'>
          <Link to='/'>
            Home
          </Link>
        <Cart/>
        </nav>
      </div>
    </header>
  );
};

export default Header;
