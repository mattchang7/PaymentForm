"use client";

import { FC, ReactElement, Fragment } from "react";
import {
  AccountsListsSectionProps,
  PaymentFormErrors,
} from "./PaymentForm.types";
import { PriceInput } from "../components/inputs";
import { format } from "path";
import { formatter, calculateProRate } from "../lib";

const AccountsListsSection: FC<AccountsListsSectionProps> = ({
  errors,
  setErrors,
  accounts,
  setAccounts,
  totalPayment,
  setTotalPayment,
}): ReactElement => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <div className="flex flex-row flex-wrap">
          <p className="font-bold mr-3">Account Lists</p>
          <p
            className={
              errors.noSelectedAccounts ? "text-red-500" : "text-blue-500"
            }
          >
            {errors.noSelectedAccounts
              ? "You must select an account"
              : `${accounts.filter((a) => a.selected).length} Account${
                  accounts.filter((a) => a.selected).length !== 1 ? "s" : ""
                } Selected`}
          </p>
        </div>
        <div className="flex flex-row sm:justify-end">
          <h3>
            Total Balance:{" "}
            {formatter.format(
              accounts.reduce(
                (totalBalance, a) => totalBalance + a.balance,
                0
              ) / 100
            )}
          </h3>
        </div>
      </div>
      <div className="grid grid-cols-2 w-full gap-4">
        {accounts.map((a) => {
          const handleBlur = (newValue: string) => {
            setAccounts((prev) => {
              return prev.map((p) =>
                p.id === a.id
                  ? {
                      ...p,
                      payment: newValue,
                    }
                  : p
              );
            });
          };
          return (
            <Fragment key={a.id}>
              <div className="flex flex-row items-center gap-5">
                <input
                  type="checkbox"
                  id={a.id}
                  checked={a.selected}
                  onChange={(e) => {
                    setErrors({
                      ...errors,
                      totalPaymentOverBalance: false,
                      totalPaymentIsNaN: false,
                      noaccountaPayment: false,
                      accountaPaymentOverBalance: false,
                      noaccountbPayment: false,
                      accountbPaymentOverBalance: false,
                      noaccountcPayment: false,
                      accountcPaymentOverBalance: false,
                      noSelectedAccounts: false,
                    });
                    setAccounts((prev) =>
                      calculateProRate(
                        prev.map((p) =>
                          p.id === a.id ? { ...a, selected: !a.selected } : p
                        ),
                        +totalPayment
                      )
                    );
                  }}
                />
                <div className="flex flex-col">
                  <label htmlFor={a.id}>
                    {a.name}
                    <p className="text-zinc-400 text-xs">Balance</p>
                    <p className="text-zinc-400 text-sm">
                      {formatter.format(a.balance / 100)}
                    </p>
                  </label>
                </div>
              </div>
              <div className="flex flex-row items-center h-full justify-end">
                <label htmlFor={a.id + "input"} className="sr-only">
                  {a.name} Input
                </label>
                <div className="flex flex-col items-end">
                  <div className="h-5" />
                  <PriceInput
                    id={a.id + "input"}
                    value={a.payment}
                    setValue={handleBlur}
                    disabled={!a.selected}
                    errors={errors}
                    errorNames={[
                      "no" + a.id + "Payment",
                      a.id + "PaymentOverBalance",
                    ]}
                    alignment="right"
                    handleChange={(e) => {
                      const newPayment =
                        e.target.value === "$"
                          ? "0"
                          : e.target.value.replace("$", "");
                      setErrors({
                        ...errors,
                        ["no" + a.id + "Payment"]: false,
                        [a.id + "PaymentOverBalance"]: false,
                        totalPaymentOverBalance: false,
                      });
                      setAccounts((prev) => {
                        return prev.map((p) =>
                          p.id === a.id
                            ? {
                                ...p,
                                payment: newPayment,
                              }
                            : p
                        );
                      });
                      setTotalPayment((prev) =>
                        (
                          Math.round(100 * (+prev - +a.payment + +newPayment)) /
                          100
                        ).toFixed(2)
                      );
                    }}
                  />
                  {errors[
                    ("no" + a.id + "Payment") as keyof PaymentFormErrors
                  ] ? (
                    <p className="text-red-500 text-end">Payment required</p>
                  ) : errors[
                      (a.id + "PaymentOverBalance") as keyof PaymentFormErrors
                    ] ? (
                    <p className="text-red-500 text-end">
                      Payment cannot exceed account balance
                    </p>
                  ) : (
                    <div className="h-5"></div>
                  )}
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
    </>
  );
};

export default AccountsListsSection;
