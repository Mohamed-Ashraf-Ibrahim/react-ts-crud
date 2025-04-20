import ProductCard from "./components/ProductCard";
import { productList } from "./data";

const App = () => {
  // RENDER
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  return <div>{renderProductList}</div>;
};

export default App;
