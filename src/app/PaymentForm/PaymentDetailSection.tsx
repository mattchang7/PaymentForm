"use client";

import { FC, ReactElement } from "react";
import { PaymentDetailSectionProps } from "./PaymentForm.types";
import { PriceInput } from "../components/inputs";

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
          errorNames={["noTotalPayment", "totalPaymentOverBalance"]}
          handleChange={(e) => {
            setErrors({
              ...errors,
              noTotalPayment: false,
              totalPaymentOverBalance: false,
              noaccountaPayment: false,
              accountaPaymentOverBalance: false,
              noaccountbPayment: false,
              accountbPaymentOverBalance: false,
              noaccountcPayment: false,
              accountcPaymentOverBalance: false,
            });
            const newPayment =
              e.target.value === "$" ? 0 : e.target.value.replace("$", "");
            setTotalPayment(newPayment);
            if (+newPayment === 0 || isNaN(+newPayment)) {
              setAccounts((prev) => prev.map((a) => ({ ...a, payment: 0 })));
            }
            if (
              newPayment > 0 &&
              accounts.filter((a) => a.selected).length > 0
            ) {
              setAccounts((prev) => calculateProRate(prev, newPayment));
            }
          }}
        />
        {errors.noTotalPayment ? (
          <p className="text-red-500">Payment required</p>
        ) : (
          errors.totalPaymentOverBalance && (
            <p className="text-red-500">Payment cannot exceed total balance</p>
          )
        )}
      </div>
    </div>
  );
};

export const calculateProRate = (accounts, newPayment) => {
  const selectedBalances = accounts.reduce(
    (sum, a) => (a.selected ? sum + a.balance : sum),
    0
  );

  if (selectedBalances === 0)
    return accounts.map((a) => ({
      ...a,
      payment: 0,
    }));

  const initialDistribution = accounts.map((a) =>
    a.selected
      ? {
          ...a,
          payment: Math.floor(
            100 * newPayment * (a.balance / selectedBalances)
          ),
        }
      : {
          ...a,
          payment: 0,
        }
  );

  let remainingCents = Math.round(
    newPayment * 100 -
      initialDistribution.reduce(
        (sum, a) => (a.selected ? sum + a.payment : sum),
        0
      )
  );
  let i = 0;
  while (remainingCents > 0) {
    if (initialDistribution[i % initialDistribution.length].selected) {
      initialDistribution[i % initialDistribution.length].payment++;
      remainingCents--;
    }
    i++;
  }
  return initialDistribution.map((a) => ({
    ...a,
    payment: (a.payment / 100).toFixed(2),
  }));
};

export default PaymentDetailSection;
