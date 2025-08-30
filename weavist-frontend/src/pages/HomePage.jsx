import ProductList from "../components/Products/ProductList";

export default function HomePage({onAddToCart}){
  return (
    <div className="container">
      <h2>Shop Woven Goods</h2>
      <ProductList onAddToCart={onAddToCart}/>
    </div>
  );
}
