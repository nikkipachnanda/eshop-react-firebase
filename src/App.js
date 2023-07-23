import logo from './logo.svg';
import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, Contact, Login, Register, Reset, Admin } from "./pages";
import {Header, Footer} from "./components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminOnlyRoute from './components/adminOnlyeRoute/AdminOnlyRoute';
import ProductDetails from './components/products/productDetails/ProductDetails';
import Cart from './pages/cart/Cart';
import CheckoutDetails from "./pages/checkout/CheckoutDetails";
import Checkout from "./pages/checkout/Checkout";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import OrderHistory from "./pages/orderHistory/OrderHistory";
import OrderDetails from "./pages/orderDetails/OrderDetails";
import ReviewProducts from "./components/reviewProducts/ReviewProducts";
import NotFound from "./pages/notFound/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
      <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={ <Home/>}></Route>
          <Route path="/Contact" element={ <Contact/>}></Route>
          <Route path="/Login" element={ <Login/>}></Route>
          <Route path="/Register" element={ <Register/>}></Route>
          <Route path="/Reset" element={ <Reset/>}></Route>

          <Route path="/admin/*" element={ <AdminOnlyRoute> <Admin/> </AdminOnlyRoute>}></Route>
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout-details" element={<CheckoutDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/order-details/:id" element={<OrderDetails />} />
          <Route path="/review-product/:id" element={<ReviewProducts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
