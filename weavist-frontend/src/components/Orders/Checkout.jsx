import { useState } from "react";
import api from "../../api/client";

export default function Checkout({requireAuth}){
  const [method,setMethod]=useState("GCash");
  async function pay(){
    const orderId = localStorage.getItem("lastOrder");
    if(!orderId) return alert("No order to pay. Checkout first.");
    try{
      const {data}=await api.post("/pay",{order_id:Number(orderId), method});
      alert(`Payment ${data.payment.status} via ${data.payment.paymentMethod}`);
    }catch(e){ alert('Payment failed'); }
  }
  return (
    <div className="container" style={{maxWidth:420}}>
      <h2>Payment</h2>
      <select value={method} onChange={e=>setMethod(e.target.value)}>
        <option>GCash</option>
        <option>PayPal</option>
        <option>Maya</option>
      </select>
      <button className="primary" onClick={pay}>Pay Now</button>
    </div>
  );
}
