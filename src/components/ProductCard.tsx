import { IProduct } from "../interfaces";
import Button from "../ui/Button";
import ToggleText from "../ui/ToggleText";
import CircleColor from "./CircleColor";
import Image from "./Image";

interface IProps {
  product: IProduct;
  idx: number;
  setProductToEdit: (product: IProduct) => void;
  openModalEdit: () => void;
  setProductsToEditIdx: (value: number) => void;
  openConfirmModal: () => void;
}

const ProductCard = ({
  product,
  setProductToEdit,
  openModalEdit,
  setProductsToEditIdx,
  idx,
  openConfirmModal,
}: IProps) => {
  const { title, description, imageURL, price, colors, category } = product;

  const renderProductColors = colors.map((color) => (
    <CircleColor key={color} color={color} />
  ));

  const onEdit = () => {
    setProductToEdit(product);
    openModalEdit();
    setProductsToEditIdx(idx);
  };

  const onRemove = () => {
    setProductToEdit(product);
    openConfirmModal();
  };

  return (
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col">
      <Image imageURL={imageURL} alt={title} className="rounded-md my-4 " />
      <h3 className="text-2xl font-bold">{title}</h3>
      <ToggleText text={description} />

      <div className="flex space-x-2 my-4 items-center">
        {renderProductColors}
      </div>

      <div className="flex items-center justify-between">
        <span className="font-bold text-2xl">${price}</span>
        <Image
          imageURL={category.imageURL}
          alt={category.name}
          className="w-10 h-10 rounded-full object-center"
        />
      </div>

      <div className="flex justify-between space-x-2 my-2 ">
        <Button color="bg-indigo-500" width="w-full" onClick={onEdit}>
          Edit
        </Button>
        <Button color="bg-red-600" width="w-full" onClick={onRemove}>
          Remove
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
