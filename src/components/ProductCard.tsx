import Button from "../ui/Button";
import Image from "./Image";

interface IProps {}

const ProductCard = ({}: IProps) => {
  return (
    <div className="border rounded-md p-2 flex flex-col m-3">
      <Image
        imageURL="https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        alt="Product Name"
        className="rounded-md my-4 "
      />
      <h3>2022 Genesis GV70: Nominee</h3>
      <p>
        As luxury brands go, South Korea’s Genesis is still in its infancy,
        having sold its first cars (as an independent Hyundai spinoff), the G80
        and G90 sedans, for the 2017 model year. Despite its relative youth
      </p>

      <div className="flex space-x-2 my-4 items-center">
        <span className="w-5 h-5 bg-indigo-500 rounded-full cursor-pointer" />
        <span className="w-5 h-5 bg-yellow-500 rounded-full cursor-pointer" />
        <span className="w-5 h-5 bg-green-500 rounded-full cursor-pointer" />
      </div>

      <div className="flex items-center justify-between">
        <span className="font-bold text-2xl">$500,000</span>
        <Image
          imageURL="https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="Product Name"
          className="w-10 h-10 rounded-full object-center"
        />
      </div>

      <div className="flex justify-between space-x-2 mt-2 ">
        <Button color="bg-purple-600" width="w-full">
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
