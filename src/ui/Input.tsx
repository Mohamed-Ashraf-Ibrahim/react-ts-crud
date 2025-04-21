import { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ ...rest }: IProps) => {
  return (
    <input
      type="text"
      {...rest}
      className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition my-3"
    />
  );
};

export default Input;
