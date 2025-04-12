import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  small?: boolean;
  outline?: boolean;
  icon?: IconType;
  disabled?: boolean;
}
const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  small,
  outline,
  disabled,
  icon: Icon,
}) => {
  return (
    <button
      disabled={disabled}
      className={`flex items-center justify-center gap-2 cursor-pointer rounded-lg p-3 ${
        outline ? "border text-black" : "bg-black text-white"
      } ${small ? "w-[250px]" : "w-full"}`}
      onClick={onClick}
    >
      {Icon && <Icon />}
      {text}
    </button>
  );
};

export default Button;
