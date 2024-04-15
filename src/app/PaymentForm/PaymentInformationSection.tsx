"use client";

import { FC, ReactElement } from "react";
import { PaymentInformationSectionProps } from "./PaymentForm.types";
import { numberFieldKeys } from "../lib";

const PaymentInformationSection: FC<PaymentInformationSectionProps> = ({
  errors,
  setErrors,
  paymentInformation,
  setPaymentInformation,
}): ReactElement => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-3">
      <h2 className="font-bold">Payment Information</h2>
      <div />
      <div className="flex flex-col">
        <label htmlFor="accountnumber">Account Number</label>
        <input
          type="number"
          id="accountnumber"
          className={
            errors.accountNumberIsEmpty
              ? "border border-red-500 h-10 px-3"
              : "border h-10 px-3"
          }
          placeholder="Account Number"
          onWheel={(e) => (e.target as HTMLInputElement).blur()}
          value={paymentInformation.accountNumber}
          onChange={(e) => {
            setErrors({
              ...errors,
              accountNumberIsEmpty: false,
              confirmationIsMismatched: false,
            });
            setPaymentInformation({
              ...paymentInformation,
              accountNumber: e.target.value,
            });
          }}
          onKeyDown={(e) =>
            numberFieldKeys.includes(e.key) && e.preventDefault()
          }
        />
        {errors.accountNumberIsEmpty && (
          <p className="text-red-500">Account number required</p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="confirmaccountnumber">Confirm Account Number</label>
        <input
          type="number"
          id="confirmaccountnumber"
          className={
            errors.confirmationIsEmpty
              ? "border border-red-500 h-10 px-3"
              : "border h-10 px-3"
          }
          placeholder="Confirm Account Number"
          value={paymentInformation.confirmationAccountNumber}
          onWheel={(e) => (e.target as HTMLInputElement).blur()}
          onChange={(e) => {
            setErrors({
              ...errors,
              confirmationIsEmpty: false,
              confirmationIsMismatched: false,
            });
            setPaymentInformation({
              ...paymentInformation,
              confirmationAccountNumber: e.target.value,
            });
          }}
          onKeyDown={(e) =>
            numberFieldKeys.includes(e.key) && e.preventDefault()
          }
        />
        {errors.confirmationIsEmpty ? (
          <p className="text-red-500">Confirmation number required</p>
        ) : (
          errors.confirmationIsMismatched && (
            <p className="text-red-500">
              Account number must match confirmation
            </p>
          )
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="routingnumber">Routing Number</label>
        <input
          type="number"
          id="routingnumber"
          className={
            errors.routingNumberIsEmpty
              ? "border border-red-500 h-10 px-3"
              : "border h-10 px-3"
          }
          placeholder="Routing Number"
          value={paymentInformation.routingNumber}
          onWheel={(e) => (e.target as HTMLInputElement).blur()}
          onChange={(e) => {
            setErrors({ ...errors, routingNumberIsEmpty: false });
            setPaymentInformation({
              ...paymentInformation,
              routingNumber: e.target.value,
            });
          }}
          onKeyDown={(e) =>
            numberFieldKeys.includes(e.key) && e.preventDefault()
          }
        />
        {errors.routingNumberIsEmpty && (
          <p className="text-red-500">Routing number must be filled</p>
        )}
      </div>
      <div className="flex flex-col">
        <p>Account Type</p>
        <div className="flex flex-row items-center justify-left h-10 px-3 gap-6">
          <div className="flex flex-row items-center">
            <input
              type="radio"
              id="checking"
              name="accounttype"
              value="Checking"
              className="mr-2"
              onChange={(e) => {
                setErrors({ ...errors, noAccountType: false });
                setPaymentInformation({
                  ...paymentInformation,
                  accountType: "Checking",
                });
              }}
            />
            <label htmlFor="checking">Checking</label>
          </div>
          <div className="flex flex-row items-center">
            <input
              type="radio"
              id="savings"
              name="accounttype"
              value="Savings"
              className="mr-2"
              onChange={(e) => {
                setErrors({ ...errors, noAccountType: false });
                setPaymentInformation({
                  ...paymentInformation,
                  accountType: "Savings",
                });
              }}
            />
            <label htmlFor="savings">Savings</label>
          </div>
        </div>
        {errors.noAccountType && (
          <p className="text-red-500">Must choose an account type</p>
        )}
      </div>
    </div>
  );
};

export default PaymentInformationSection;
