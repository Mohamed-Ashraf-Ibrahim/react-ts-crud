import { ReactNode } from "react";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color: string;
  width?: "w-full" | "w-fit";
}

const Button = ({
  children,
  color,
  width = "w-full",
  type = "button",
  ...rest
}: IProps) => {
  return (
    <button
      type={type}
      className={`${color} ${width} p-3 rounded-md text-white cursor-pointer flex items-center justify-center`}
      {...rest}
    >
      <span className="font-bold">{children}</span>
    </button>
  );
};

export default Button;
