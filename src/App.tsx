import { ChangeEvent, FormEvent, useState } from "react";
import { colors, formInputsList, productList } from "./data";
import { IProduct } from "./interfaces";

import ProductCard from "./components/ProductCard";
import Input from "./ui/Input";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ErrorMessage";
import CircleColor from "./components/CircleColor";

const App = () => {
  const defaultProductObj = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };
  // STATES
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [tempColors, setTempColors] = useState<string[]>([]);
  // HANDLER
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { title, description, imageURL, price } = product;
    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
    });
    const hasNoErrors = Object.values(errors).every((value) => value === "");
    setErrors(errors);
    if (!hasNoErrors) return;
    console.log("send this product to our server");
  };

  const onCancel = () => {
    setProduct(defaultProductObj);
    closeModal();
  };

  // RENDER
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  const renderFormList = formInputsList.map((input) => (
    <div key={input.id} className="flex flex-col">
      <label htmlFor={input.id} className="text-sm font-semibold mt-2">
        {input.label}
      </label>
      <Input
        type="text"
        id={input.id}
        name={input.name}
        value={product[input.name]}
        onChange={onChangeHandler}
      />
      <ErrorMessage msg={errors[input.name]} />
    </div>
  ));

  const renderProductColors = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        if (tempColors.includes(color)) {
          setTempColors((prev) => prev.filter((item) => item !== color));
          return;
        }
        setTempColors((prev) => [...prev, color]);
      }}
    />
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
        <form onSubmit={onSubmitHandler}>
          {renderFormList}
          <div className="flex items-center flex-wrap space-x-1 space-y-1">
            {tempColors.map((color) => (
              <span
                key={color}
                className=" p-1 mr-1 text-xs rounded-md text-white"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>
          <div className="flex space-x-2 my-4 items-center">
            {renderProductColors}
          </div>
          <div className="flex items-center space-x-3 my-4">
            <Button color="bg-gray-300 hover:bg-gray-400" onClick={onCancel}>
              Cancel
            </Button>
            <Button color="bg-indigo-700 hover:bg-indigo-800" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Modal>
    </main>
  );
};

export default App;
