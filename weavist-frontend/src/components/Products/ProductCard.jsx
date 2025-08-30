export default function ProductCard({p, onAdd}){
    return (
      <div className="card">
        <img alt={p.productName} src={p.image || "https://via.placeholder.com/400x300?text=Weavist"} />
        <h3>{p.productName}</h3>
        <p className="badge">₱{Number(p.productPrice).toFixed(2)}</p>
        <p>Stock: {p.stock}</p>
        <button className="primary" disabled={p.stock<1} onClick={()=>onAdd(p.id)}>Add to cart</button>
      </div>
    );
  }
  