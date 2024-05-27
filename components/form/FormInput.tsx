import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

function FormInput({
  inputName,
  type,
  label,
  defaultValue,
  placeholder,
}: {
  inputName: string;
  type: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
}) {
  return (
    <div className="mb-2 ">
      <Label htmlFor={inputName}>{label || inputName}</Label>
      <Input
        type={type}
        id={inputName}
        name={inputName}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required
      />
    </div>
  );
}

export default FormInput;
