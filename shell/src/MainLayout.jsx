import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.scss";

import Products from "products/ProductList";
import ProductDescriptionPage from "pdp/PDPContent";

const MainLayout = () => {
  return (
    <Router>
      <div className="">
        <Header />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product/:id" element={<ProductDescriptionPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default MainLayout;
