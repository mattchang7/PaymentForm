"use client";

import { FC, ReactElement } from "react";
import { PaymentDetailSectionProps } from "./PaymentForm.types";
import { PriceInput } from "../components/inputs";
import { calculateProRate } from "../lib";

// Controlled input for payment details
const PaymentDetailSection: FC<PaymentDetailSectionProps> = ({
  errors,
  setErrors,
  totalPayment,
  setTotalPayment,
  accounts,
  setAccounts,
}): ReactElement => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-3">
      <h2 className="font-bold">Payment Detail</h2>
      <div />
      <div>
        <label htmlFor="paymentamount">Payment Amount</label>
        <PriceInput
          id="paymentamount"
          value={totalPayment}
          setValue={setTotalPayment}
          errors={errors}
          disabled={false}
          alignment="left"
          errorNames={[
            "noTotalPayment",
            "totalPaymentOverBalance",
            "totalPaymentIsNaN",
          ]}
          handleChange={(e) => {
            // sets all errors for payments to false because individual account payments and total payments are tied together
            setErrors({
              ...errors,
              noTotalPayment: false,
              totalPaymentOverBalance: false,
              totalPaymentIsNaN: false,
              noaccountaPayment: false,
              accountaPaymentOverBalance: false,
              noaccountbPayment: false,
              accountbPaymentOverBalance: false,
              noaccountcPayment: false,
              accountcPaymentOverBalance: false,
            });
            const newPayment =
              e.target.value === "$" ? "0" : e.target.value.replace("$", "");
            setTotalPayment(newPayment);
            if (+newPayment === 0 || isNaN(+newPayment)) {
              setAccounts((prev) => prev.map((a) => ({ ...a, payment: "0" })));
            }
            if (
              +newPayment > 0 &&
              accounts.filter((a) => a.selected).length > 0
            ) {
              setAccounts((prev) => calculateProRate(prev, +newPayment));
            }
          }}
        />
        {errors.noTotalPayment ? (
          <p className="text-red-500">Payment required</p>
        ) : errors.totalPaymentOverBalance ? (
          <p className="text-red-500">Payment cannot exceed total balance</p>
        ) : (
          errors.totalPaymentIsNaN && (
            <p className="text-red-500">Payment must be a number</p>
          )
        )}
      </div>
    </div>
  );
};

export default PaymentDetailSection;
