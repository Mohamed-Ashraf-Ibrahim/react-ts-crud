import { ChangeEvent, useState } from "react";
import { formInputsList, productList } from "./data";
import { IProduct } from "./interfaces";

import ProductCard from "./components/ProductCard";
import Input from "./ui/Input";
import Button from "./ui/Button";
import Modal from "./ui/Modal";

const App = () => {
  // STATES
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<IProduct>({
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  });

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // RENDER
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  const renderFormList = formInputsList.map((input) => (
    <div key={input.id} className="flex flex-col">
      <label htmlFor={input.id} className="text-sm font-semibold">
        {input.label}
      </label>
      <Input
        type="text"
        id={input.id}
        name={input.name}
        value={product[input.name]}
        onChange={onChangeHandler}
      />
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
