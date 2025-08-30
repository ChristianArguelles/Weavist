import { useEffect, useState } from "react";
import api from "../../api/client";

export default function CampaignsList({requireAuth}){
  const [items,setItems]=useState([]);
  const [don,setDon]=useState({campaign_id:null,amount:100,method:"GCash"});

  useEffect(()=>{ (async()=>{ try{ const {data}=await api.get("/campaigns"); setItems(data); }catch(e){ setItems([]); } })(); },[]);

  async function donate(campaign_id){
    if(!requireAuth) { return alert('Login required'); }
    try{
      const payload = {...don, campaign_id};
      const {data} = await api.post("/donate", payload);
      alert(`Donated ₱${don.amount} to ${data.campaign.title}`);
      // reload campaigns
      const {data:re} = await api.get("/campaigns");
      setItems(re);
    }catch(e){ alert('Donation failed'); }
  }

  return (
    <div className="container">
      <h2>Campaigns</h2>
      <div className="grid">
        {items.map(c=>(
          <div className="card" key={c.id}>
            <h3>{c.title}</h3>
            <p>{c.description}</p>
            <p className="badge">Raised: ₱{Number(c.raisedAmount).toFixed(2)} / ₱{Number(c.donationTarget).toFixed(2)}</p>
            <div className="row" style={{marginTop:8}}>
              <input type="number" min="1" value={don.amount} onChange={e=>setDon({...don, amount:Number(e.target.value)})}/>
              <select value={don.method} onChange={e=>setDon({...don, method:e.target.value})}>
                <option>GCash</option><option>PayPal</option><option>Maya</option>
              </select>
              <button className="primary" onClick={()=>donate(c.id)}>Donate</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
