import { useEffect, useState } from "react";
import api from "../../api/client";
import ProductCard from "./ProductCard";

export default function ProductList({onAddToCart}){
  const [items,setItems] = useState([]);
  useEffect(()=>{ (async()=>{ try{ const {data}=await api.get("/products"); setItems(data); }catch(e){ setItems([]); } })(); },[]);
  return (
    <div className="grid">
      {items.map(p => <ProductCard key={p.id} p={p} onAdd={onAddToCart}/>)}
    </div>
  );
}
