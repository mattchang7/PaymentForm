import { FC, ReactElement } from "react";
import {
  PaymentFormErrors,
  PriceInputProps,
} from "../PaymentForm/PaymentForm.types";
import { numberFieldKeys } from "../lib";

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
  // generates Tailwind classname based on the props
  const className = `border h-10 px-3 ${
    alignment === "left" ? "w-full" : "w-2/3"
  } ${alignment !== "left" && "text-end"} ${
    errorNames.filter((n) => errors[n as keyof PaymentFormErrors]).length > 0 &&
    "border-red-500"
  }`;
  return (
    <input
      type="text"
      id={id}
      autoComplete="off"
      className={className}
      disabled={disabled}
      placeholder="$0.00"
      value={value === "0" || value === "0.00" ? "" : "$" + value} // Correctly formats the input value
      onBlur={(e) => {
        // Messy conditionals, but this checks for inputs that aren't in complete 0.00 form, and formats them correctly once the user blurs the input field
        if (e.target.value[1] === ".") {
          if (e.target.value[e.target.value.length - 2] === ".")
            setValue(
              e.target.value === "$"
                ? "0"
                : "0" + e.target.value.replace("$", "") + "0"
            );
          else if (e.target.value[e.target.value.length - 1] === ".")
            setValue("0");
          else {
            setValue(
              e.target.value === "$"
                ? "0"
                : "0" + e.target.value.replace("$", "")
            );
          }
        } else if (+e.target.value.slice(1) === 0) {
          setValue("0");
        } else {
          if (e.target.value[e.target.value.length - 2] === ".")
            setValue(
              e.target.value === "$"
                ? "0"
                : e.target.value.replace("$", "") + "0"
            );
          else if (e.target.value[e.target.value.length - 1] === ".")
            setValue(
              e.target.value === "$"
                ? "0"
                : e.target.value.replace("$", "") + "00"
            );
          else if (!e.target.value.includes("."))
            setValue(
              e.target.value === "$"
                ? "0"
                : e.target.value.replace("$", "") + ".00"
            );
        }
      }}
      onKeyDown={(e) => {
        // Another messy conditional, this holds the logic for supressing any keystrokes besides numbers, editing keys, command keys, and one period
        // Also prevents users from adding more than two decimal places (using selectionStart to track cursor location)
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
          ((e.target as HTMLInputElement).value.includes(".") ||
            (e.target as HTMLInputElement).value === "")
        )
          e.preventDefault();
        else if (
          (e.target as HTMLInputElement).value.indexOf(".") > 0 &&
          (e.target as HTMLInputElement).value.indexOf(".") <=
            (e.target as HTMLInputElement).value.length - 3 &&
          (e.target as HTMLInputElement).selectionStart! >
            (e.target as HTMLInputElement).value.length - 3
        )
          e.preventDefault();
        else if (
          e.key === "." &&
          (e.target as HTMLInputElement).selectionStart! <=
            (e.target as HTMLInputElement).value.length - 3
        )
          e.preventDefault();
      }}
      onChange={handleChange}
    />
  );
};
