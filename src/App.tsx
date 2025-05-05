import { ChangeEvent, FormEvent, useState } from "react";
import { categories, colors, formInputsList, productList } from "./data";
import { IProduct } from "./interfaces";
import { v4 as uuid } from "uuid";

import ProductCard from "./components/ProductCard";
import Input from "./ui/Input";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ErrorMessage";
import CircleColor from "./components/CircleColor";
import SelectMenu from "./ui/SelectMenu";
import { TProductName } from "./types";
import toast, { Toaster } from "react-hot-toast";

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
    colors: "",
  });
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [productToEdit, setProductToEdit] =
    useState<IProduct>(defaultProductObj);
  const [productsToEditIdx, setProductsToEditIdx] = useState<number>(0);
  const [openEditModal, setEditModal] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  // HANDLER
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const openModalEdit = () => setEditModal(true);
  const closeModalEdit = () => setEditModal(false);
  const closeConfirmModal = () => setIsOpenConfirmModal(false);
  const openConfirmModal = () => setIsOpenConfirmModal(true);

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

  const onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;
    setProductToEdit({
      ...productToEdit,
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
      colors: tempColors,
    });

    const hasNoErrors = Object.values(errors).every((value) => value === "");
    setErrors(errors);
    console.log(errors);
    if (!hasNoErrors) return;

    setProducts((prev) => [
      {
        ...product,
        id: uuid(),
        colors: tempColors,
        category: selectedCategory,
      },
      ...prev,
    ]);

    setProduct(defaultProductObj);
    setTempColors([]);
    closeModal();
  };

  const onSubmitEditHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { title, description, imageURL, price } = productToEdit;
    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
      colors: [...productToEdit.colors, ...tempColors],
    });

    const hasNoErrors = Object.values(errors).every((value) => value === "");
    setErrors(errors);
    if (!hasNoErrors) return;

    const updatedProducts = [...products];
    updatedProducts[productsToEditIdx] = {
      ...productToEdit,
      colors: tempColors.concat(productToEdit.colors),
    };
    setProducts(updatedProducts);

    setProductToEdit(defaultProductObj);
    setTempColors([]);
    closeModalEdit();
  };

  const onCancel = () => {
    setProduct(defaultProductObj);
    closeModal();
  };
  const onCancelEdit = () => {
    setProduct(defaultProductObj);
    closeModalEdit();
  };

  const removeProductHandler = () => {
    const filtered = products.filter(
      (product) => product.id !== productToEdit.id
    );
    setProducts(filtered);
    closeConfirmModal();
    toast("Product has been deleted", {
      style: {
        backgroundColor: "black",
        color: "white",
      },
    });
  };

  // RENDER
  const renderProductList = products.map((product, idx) => (
    <ProductCard
      key={product.id}
      idx={idx}
      product={product}
      setProductToEdit={setProductToEdit}
      setProductsToEditIdx={setProductsToEditIdx}
      openModalEdit={openModalEdit}
      openConfirmModal={openConfirmModal}
    />
  ));

  const renderEditInputs = (id: string, label: string, name: TProductName) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="text-sm font-semibold mt-2">
          {label}
        </label>
        <Input
          type="text"
          id={id}
          name={name}
          value={productToEdit[name]}
          onChange={onChangeEditHandler}
        />
        <ErrorMessage msg={errors[name]} />
      </div>
    );
  };

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
        if (product.colors.includes(color)) {
          setTempColors((prev) => prev.filter((item) => item !== color));
        }
        setTempColors((prev) => [...prev, color]);
        setErrors((prev) => ({ ...prev, colors: "" }));
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

      {/* ADD PRODUCT MODAL */}
      <Modal isOpen={isOpen} closeModal={closeModal} title="ADD A NEW Product">
        <form onSubmit={onSubmitHandler}>
          {renderFormList}
          <SelectMenu
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
          <div className="flex items-center flex-wrap space-x-1 space-y-1 mt-3">
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
          <ErrorMessage msg={errors.colors} />
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

      {/* EDIT PRODUCT MODAL */}
      <Modal
        isOpen={openEditModal}
        closeModal={closeModalEdit}
        title="EDIT PRODUCT"
      >
        <form onSubmit={onSubmitEditHandler}>
          {renderEditInputs("title", "Product Title", "title")}
          {renderEditInputs(
            "description",
            "Product Description",
            "description"
          )}
          {renderEditInputs("imageURL", "Product Image URL", "imageURL")}
          {renderEditInputs("price", "Product Price", "price")}
          <SelectMenu
            selected={productToEdit.category}
            setSelected={(value) =>
              setProductToEdit({ ...productToEdit, category: value })
            }
          />
          <div className="flex items-center flex-wrap space-x-1 space-y-1 mt-3">
            {tempColors.concat(productToEdit.colors).map((color) => (
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
          <ErrorMessage msg={errors.colors} />
          <div className="flex items-center space-x-3 my-4">
            <Button
              color="bg-gray-300 hover:bg-gray-400"
              onClick={onCancelEdit}
            >
              Cancel
            </Button>
            <Button color="bg-indigo-700 hover:bg-indigo-800" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isOpenConfirmModal}
        closeModal={closeConfirmModal}
        title="Are you sure want to remove this product from your store?"
        description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
      >
        <div className="flex items-center space-x-3 my-4">
          <Button
            color="bg-[#c2344d] hover:bg-red-800"
            onClick={removeProductHandler}
          >
            Yes, remove
          </Button>
          <Button color="bg-[#f5f5fa] hover:bg-gray-300 !text-black">
            Cancel
          </Button>
        </div>
      </Modal>
      <Toaster />
    </main>
  );
};

export default App;
