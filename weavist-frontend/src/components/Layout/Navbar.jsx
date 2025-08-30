import { Link } from "react-router-dom";

export default function Navbar({user, onLogout}) {
  return (
    <nav className="nav">
      <div style={{display:'flex', alignItems:'center', gap:12}}>
        <Link to="/" className="brand">Weavist</Link>
      </div>
      <div style={{display:'flex', alignItems:'center', gap:12}}>
        <Link to="/">Shop</Link>
        <Link to="/stories">Stories</Link>
        <Link to="/campaigns">Campaigns</Link>
        <Link to="/cart">Cart</Link>
        {user ? (
          <>
            <span style={{color:'#fff'}}>Hi, {user.name}</span>
            <button onClick={onLogout} className="btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="btn">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
