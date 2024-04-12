import { FC, ReactElement } from "react";
import { numberFieldKeys } from "../PaymentForm/PaymentForm";
import { PriceInputProps } from "../PaymentForm/PaymentForm.types";

export const PriceInput: FC<PriceInputProps> = ({
  value,
  setValue,
  handleChange,
  alignment = "left",
  disabled = false,
  id,
  errors,
  errorNames,
}): ReactElement => {
  const className = `border h-10 px-3 ${
    alignment === "left" ? "w-full" : "w-2/3"
  } ${alignment !== "left" && "text-end"} ${
    errorNames.filter((n) => errors[n]).length > 0 && "border-red-500"
  }`;
  return (
    <input
      type="text"
      id={id}
      autoComplete="off"
      className={className}
      disabled={disabled}
      placeholder="$0.00"
      value={value === 0 || value === "0.00" ? "" : "$" + value}
      onBlur={(e) => {
        if (e.target.value[1] === ".") {
          if (e.target.value[e.target.value.length - 2] === ".")
            setValue(
              e.target.value === "$"
                ? 0
                : "0" + e.target.value.replace("$", "") + "0"
            );
          else if (e.target.value[e.target.value.length - 1] === ".")
            setValue(0);
          else {
            setValue(
              e.target.value === "$" ? 0 : "0" + e.target.value.replace("$", "")
            );
          }
        } else if (+e.target.value.slice(1) === 0) {
          setValue(0);
        } else {
          if (e.target.value[e.target.value.length - 2] === ".")
            setValue(
              e.target.value === "$" ? 0 : e.target.value.replace("$", "") + "0"
            );
          else if (e.target.value[e.target.value.length - 1] === ".")
            setValue(
              e.target.value === "$"
                ? 0
                : e.target.value.replace("$", "") + "00"
            );
          else if (!e.target.value.includes("."))
            setValue(
              e.target.value === "$"
                ? 0
                : e.target.value.replace("$", "") + ".00"
            );
        }
      }}
      onKeyDown={(e) => {
        if (
          e.metaKey ||
          e.key === "Backspace" ||
          e.key === "Tab" ||
          e.key === "ArrowRight" ||
          e.key === "ArrowLeft"
        )
          return;
        else if (!numberFieldKeys.includes(e.key)) e.preventDefault();
        else if (
          e.key === "." &&
          (e.target.value.includes(".") || e.target.value === "")
        )
          e.preventDefault();
        else if (
          e.target.value.indexOf(".") > 0 &&
          e.target.value.indexOf(".") <= e.target.value.length - 3 &&
          e.target.selectionStart > e.target.value.length - 3
        )
          e.preventDefault();
        else if (
          e.key === "." &&
          e.target.selectionStart <= e.target.value.length - 3
        )
          e.preventDefault();
      }}
      onChange={handleChange}
    />
  );
};
