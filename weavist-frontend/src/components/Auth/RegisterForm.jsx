import { useState } from "react";
import api, { setAuth } from "../../api/client";
import { useNavigate } from "react-router-dom";

export default function RegisterForm({onAuth}){
  const [f,setF]=useState({name:"",email:"",password:""});
  const [msg,setMsg]=useState("");
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    try{
      const {data} = await api.post("/register", f);
      setAuth(data.token);
      localStorage.setItem("token", data.token);
      onAuth && onAuth(data.user, data.token);
      nav("/");
    }catch(err){ setMsg("Register failed"); }
  }
  return (
    <form onSubmit={submit} className="container" style={{maxWidth:420}}>
      <h2>Create account</h2>
      <input placeholder="Name" value={f.name} onChange={e=>setF({...f,name:e.target.value})}/>
      <input placeholder="Email" value={f.email} onChange={e=>setF({...f,email:e.target.value})}/>
      <input placeholder="Password" type="password" value={f.password} onChange={e=>setF({...f,password:e.target.value})}/>
      <button className="primary">Sign up</button>
      {msg && <p>{msg}</p>}
    </form>
  );
}
