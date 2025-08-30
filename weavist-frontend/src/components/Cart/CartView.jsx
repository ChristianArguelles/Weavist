import { useEffect, useState } from "react";
import api from "../../api/client";

export default function CartView({requireAuth}){
  const [cart,setCart]=useState(null);
  async function load(){ try{ const {data}=await api.get("/cart"); setCart(data); }catch(e){ setCart(null); } }
  useEffect(()=>{ requireAuth(); load(); },[]);

  async function update(item_id, quantity){
    try{ const {data}=await api.post("/cart/update",{item_id,quantity}); setCart(data); }catch(e){ alert('Update failed'); }
  }
  async function remove(item_id){
    try{ const {data}=await api.post("/cart/remove",{item_id}); setCart(data); }catch(e){ alert('Remove failed'); }
  }
  async function checkout(){
    try{ const {data}=await api.post("/checkout"); alert("Order created. Now pay."); localStorage.setItem("lastOrder", data.id); }catch(e){ alert('Checkout failed'); }
  }

  if(!cart) return <div className="container">Loading cart…</div>;
  if(!cart.items || cart.items.length===0) return <div className="container"><h2>Your cart is empty.</h2></div>;

  return (
    <div className="container">
      <h2>Your Cart</h2>
      {cart.items.map(i=>(
        <div key={i.id} className="row card" style={{justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <strong>{i.product.productName}</strong>
            <div>₱{Number(i.price).toFixed(2)}</div>
          </div>
          <div style={{width:160}}>
            <input type="number" min="1" value={i.quantity} onChange={e=>update(i.id, Number(e.target.value))}/>
          </div>
          <div style={{display:'flex',gap:8}}>
            <button className="danger" onClick={()=>remove(i.id)}>Remove</button>
          </div>
        </div>
      ))}
      <h3>Total: ₱{Number(cart.total).toFixed(2)}</h3>
      <button className="primary" onClick={checkout}>Checkout</button>
    </div>
  );
}
