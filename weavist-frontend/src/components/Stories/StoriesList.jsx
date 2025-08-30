import { useEffect, useState } from "react";
import api from "../../api/client";

export default function StoriesList(){
  const [items,setItems]=useState([]);
  useEffect(()=>{ (async()=>{ try{ const {data}=await api.get("/stories"); setItems(data); }catch(e){ setItems([]); } })(); },[]);
  return (
    <div className="container">
      <h2>Weaving Stories</h2>
      {items.map(s=>(
        <div className="card" key={s.id} style={{marginBottom:12}}>
          <h3>{s.storyTitle}</h3>
          <p>{s.content}</p>
        </div>
      ))}
    </div>
  );
}
