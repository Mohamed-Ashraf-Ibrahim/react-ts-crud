import { useState } from "react";
import ProductCard from "./components/ProductCard";
import { formInputsList, productList } from "./data";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import Input from "./ui/Input";

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
  const renderFormList = formInputsList.map((input) => (
    <div className="flex flex-col">
      <label htmlFor={input.id} className="text-lg font-semibold">{input.label}</label>
      <Input type="text" key={input.id} id={input.id} name={input.name} />
    </div>
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
        <form action="">
          {renderFormList}
          <div className="flex items-center space-x-3">
            <Button
              color="bg-indigo-700 hover:bg-indigo-800"
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button color="bg-gray-300 hover:bg-gray-400">Submit</Button>
          </div>
        </form>
      </Modal>
    </main>
  );
};

export default App;
