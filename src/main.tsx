import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "animate.css/animate.compat.css"
import "react-activity/dist/library.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from './pages/home.tsx';
import AboutUs from './pages/aboutus.tsx';
import OurProducts from './pages/products.tsx';
import SingleProduct from './pages/singleproduct.tsx';
import ContactUs from './pages/contactus.tsx';
import Gallery from './pages/gallery.tsx';
import Register from './pages/register.tsx';
import Login from './pages/login.tsx';
import AdminHome from './pages/adminpages/home.tsx';
import AdminProducts from './pages/adminpages/products.tsx';
import AdminProduct from './pages/adminpages/product.tsx';
import AdminOrders from './pages/adminpages/orders.tsx';
import AdminOrder from './pages/adminpages/order.tsx';
import AdminAddOrEdit from './pages/adminpages/addoreditproduct.tsx';
import AdminLogin from './pages/adminpages/login.tsx';
import { ToastContainer } from 'react-toastify';
import Cart from './pages/cart.tsx';
import ShippingAddressPage from './pages/shippingAddress.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastContainer />
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/products" element={<OurProducts />} />
      <Route path="/shippingaddress" element={<ShippingAddressPage />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/product/:id" element={<SingleProduct />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />


      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminHome />} />
      <Route path="/admin/products" element={<AdminProducts />} />
      <Route path="/admin/product" element={<AdminProduct />} />
      <Route path="/admin/orders" element={<AdminOrders />} />
      <Route path="/admin/order" element={<AdminOrder />} />
      <Route path="/admin/addoredit" element={<AdminAddOrEdit />} />
    </Routes>
  </BrowserRouter>
  </StrictMode>,
)
