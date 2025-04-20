import { IProduct } from "../interfaces";
import Button from "../ui/Button";
import ToggleText from "../ui/ToggleText";
import Image from "./Image";

interface IProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
  const { title, description, imageURL, price, category } = product;
  return (
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col">
      <Image imageURL={imageURL} alt={title} className="rounded-md my-4 " />
      <h3>{title}</h3>
      <ToggleText text={description} />

      <div className="flex space-x-2 my-4 items-center">
        <span className="w-5 h-5 bg-indigo-500 rounded-full cursor-pointer" />
        <span className="w-5 h-5 bg-yellow-500 rounded-full cursor-pointer" />
        <span className="w-5 h-5 bg-green-500 rounded-full cursor-pointer" />
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
        <Button color="bg-indigo-500" width="w-full">
          Edit
        </Button>
        <Button color="bg-red-600" width="w-full">
          Remove
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
