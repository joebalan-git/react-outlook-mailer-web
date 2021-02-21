import React from "react";
import Button from "react-bootstrap/Button";
import { BsArrowRepeat } from "react-icons/bs";
import "./LoaderButton.css";

interface Props {
  isLoading: boolean;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

const LoaderButton: React.FC<Props> = (props) => {
  const { isLoading, className, disabled } = props;

  return (
    <Button
      type="submit"
      disabled={disabled || isLoading}
      className={`LoaderButton ${className}`}
    >
      {isLoading && <BsArrowRepeat className="spinning" />}
      {props.children}
    </Button>
  );
}

export default LoaderButton;