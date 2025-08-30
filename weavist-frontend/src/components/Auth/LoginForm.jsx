import { useState } from "react";
import api, { setAuth } from "../../api/client";
import { useNavigate } from "react-router-dom";

export default function LoginForm({onAuth}){
  const [f,setF]=useState({email:"",password:""});
  const [msg,setMsg]=useState("");
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    try{
      const {data} = await api.post("/login", f);
      setAuth(data.token); localStorage.setItem("token", data.token);
      onAuth && onAuth(data.user, data.token);
      nav("/");
    }catch(err){ setMsg("Invalid credentials"); }
  }
  return (
    <form onSubmit={submit} className="container" style={{maxWidth:420}}>
      <h2>Login</h2>
      <input placeholder="Email" value={f.email} onChange={e=>setF({...f,email:e.target.value})}/>
      <input placeholder="Password" type="password" value={f.password} onChange={e=>setF({...f,password:e.target.value})}/>
      <button className="primary">Login</button>
      {msg && <p>{msg}</p>}
    </form>
  );
}
