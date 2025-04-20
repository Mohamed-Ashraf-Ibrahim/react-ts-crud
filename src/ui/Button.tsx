import { ReactNode } from "react";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color: string;
  width?: "w-full" | "w-fit";
}

const Button = ({ children, color, width = "w-full", ...rest }: IProps) => {
  return (
    <button
      className={`${color} ${width} p-3 rounded-md text-white  cursor-pointer`}
      {...rest}
    >
      <span className="font-bold">{children}</span>
    </button>
  );
};

export default Button;
