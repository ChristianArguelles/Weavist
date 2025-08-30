import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import HomePage from "./pages/HomePage";
import StoriesList from "./components/Stories/StoriesList";
import CampaignsList from "./components/Campaigns/CampaignsList";
import CartView from "./components/Cart/CartView";
import Checkout from "./components/Orders/Checkout";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";
import NotFound from "./pages/NotFound";
import api, { setAuth } from "./api/client";
import "./styles.css";

function Shell(){
  const nav = useNavigate();
  const [user,setUser]=useState(null);
  const [token,setToken]=useState(localStorage.getItem("token")||"");

  useEffect(()=>{
    if(token){ setAuth(token); // a quick attempt to fetch user profile could be added
      // we don't have a profile endpoint; user object returned on login/register saved locally
      // optionally: parse token or call backend user endpoint if created
    }
  },[token]);

  function onAuth(u,t){
    setUser(u); setToken(t); localStorage.setItem("token",t); nav("/");
  }
  function requireAuth(){
    if(!localStorage.getItem("token")) nav("/login");
  }
  async function logout(){
    try{ await api.post("/logout"); }catch{}
    setUser(null); setToken(""); localStorage.removeItem("token"); setAuth(null); nav("/");
  }

  async function addToCart(product_id){
    if(!localStorage.getItem("token")) return nav("/login");
    try{
      await api.post("/cart/add",{product_id, quantity:1});
      alert("Added to cart");
    }catch(e){ alert('Add failed'); }
  }

  return (
    <>
      <Navbar user={user} onLogout={logout}/>
      <Routes>
        <Route path="/" element={<HomePage onAddToCart={addToCart}/>}/>
        <Route path="/stories" element={<StoriesList/>}/>
        <Route path="/campaigns" element={<CampaignsList requireAuth={requireAuth}/>}/>
        <Route path="/cart" element={<CartView requireAuth={requireAuth}/>}/>
        <Route path="/checkout" element={<Checkout requireAuth={requireAuth}/>}/>
        <Route path="/login" element={<LoginForm onAuth={onAuth}/>}/>
        <Route path="/register" element={<RegisterForm onAuth={onAuth}/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default function App(){
  return <BrowserRouter><Shell/></BrowserRouter>;
}
