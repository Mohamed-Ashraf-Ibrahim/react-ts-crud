import ProductCard from "./components/ProductCard";
import { productList } from "./data";

const App = () => {
  // RENDER
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  return (
    <main className="container mx-auto p-3">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 my-4  items-center">
        {renderProductList}
      </div>
    </main>
  );
};

export default App;
