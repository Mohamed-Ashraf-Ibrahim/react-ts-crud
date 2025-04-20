import { useState } from "react";

interface IProps {
  text: string;
  maxLength?: number;
}

const ToggleText = ({ text, maxLength = 50 }: IProps) => {
  const [expanded, setExpanded] = useState(false);
  const handleToggle = () => setExpanded((prev) => !prev);

  return (
    <span>
      {expanded ? text : `${text.slice(0, maxLength)}...`}
      <button
        onClick={handleToggle}
        className="text-blue-500 ml-2 underline text-sm font-semibold cursor-pointer"
      >
        {expanded ? "Show Less" : "Show More"}
      </button>
    </span>
  );
};

export default ToggleText;
