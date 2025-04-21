import { useState } from "react";
import ProductCard from "./components/ProductCard";
import { productList } from "./data";
import Modal from "./ui/Modal";
import Button from "./ui/Button";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  // RENDER
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  return (
    <main className="container mx-auto p-3">
      <Button color="bg-indigo-500" width="w-full" onClick={openModal}>
        Add Product
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-3 my-4 p-2">
        {renderProductList}
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal} title="ADD A NEW Product">
        <div className="flex items-center space-x-3">
          <Button color="bg-indigo-700 hover:bg-indigo-800" onClick={closeModal}>Cancel</Button>
          <Button color="bg-gray-300 hover:bg-gray-400">Submit</Button>
        </div>
      </Modal>
    </main>
  );
};

export default App;
