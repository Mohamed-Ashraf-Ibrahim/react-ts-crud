import ProductCard from "./components/ProductCard";
import { productList } from "./data";
import Modal from "./ui/Modal";

const App = () => {
  // RENDER
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  return (
    <main className="container mx-auto p-3">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-3 my-4 p-2">
        {renderProductList}
      </div>
      <Modal/>
    </main>
  );
};

export default App;
