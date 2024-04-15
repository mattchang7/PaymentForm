"use client";

import { FC, ReactElement, useState } from "react";
import {
  PaymentInformation,
  PaymentFormErrors,
  Account,
  PaymentFormProps,
} from "./PaymentForm.types";
import PaymentInformationSection from "./PaymentInformationSection";
import PaymentDetailSection from "./PaymentDetailSection";
import AccountListsSection from "./AccountListsSection";
import { INITIAL_ACCOUNTS } from "../lib";

const PaymentForm: FC<PaymentFormProps> = ({ handleSubmit }): ReactElement => {
  const [accounts, setAccounts] = useState<Account[]>(INITIAL_ACCOUNTS);
  const [totalPayment, setTotalPayment] = useState<string>("0");
  const [paymentInformation, setPaymentInformation] =
    useState<PaymentInformation>({
      accountNumber: "",
      confirmationAccountNumber: "",
      routingNumber: "",
      accountType: undefined,
    });
  // Using state to track form validation
  const [errors, setErrors] = useState<PaymentFormErrors>({
    accountNumberIsEmpty: false,
    confirmationIsEmpty: false,
    confirmationIsMismatched: false,
    routingNumberIsEmpty: false,
    noAccountType: false,
    noSelectedAccounts: false,
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
  return (
    <form
      className="bg-white flex flex-col h-fit w-full items-center p-10 gap-7 min-w-[400px]"
      onSubmit={(e) => {
        // The messiest conditional, this checks all controlled inputs and their possible errors on submit, and sets the error state accordingly
        e.preventDefault();
        const newErrors = { ...errors };

        if (paymentInformation.accountNumber === "") {
          newErrors.accountNumberIsEmpty = true;
        }

        if (paymentInformation.confirmationAccountNumber === "") {
          newErrors.confirmationIsEmpty = true;
        } else if (
          paymentInformation.confirmationAccountNumber !==
          paymentInformation.accountNumber
        ) {
          newErrors.confirmationIsMismatched = true;
        }

        if (paymentInformation.routingNumber === "") {
          newErrors.routingNumberIsEmpty = true;
        }

        if (paymentInformation.accountType === undefined) {
          newErrors.noAccountType = true;
        }

        if (accounts.filter((a) => a.selected).length === 0) {
          newErrors.noSelectedAccounts = true;
        }

        if (totalPayment === "0") {
          newErrors.noTotalPayment = true;
        } else if (isNaN(+totalPayment)) {
          newErrors.totalPaymentIsNaN = true;
        } else if (
          +totalPayment * 100 >
          accounts.reduce((sum, a) => sum + a.balance, 0)
        ) {
          newErrors.totalPaymentOverBalance = true;
        }

        if (
          accounts.find((a) => a.id === "accounta")!.selected &&
          (+accounts.find((a) => a.id === "accounta")!.payment === 0 ||
            isNaN(+accounts.find((a) => a.id === "accounta")!.payment))
        ) {
          newErrors.noaccountaPayment = true;
        } else if (
          +accounts.find((a) => a.id === "accounta")!.payment * 100 >
          accounts.find((a) => a.id === "accounta")!.balance
        ) {
          newErrors.accountaPaymentOverBalance = true;
        }

        if (
          accounts.find((a) => a.id === "accountb")!.selected &&
          (+accounts.find((a) => a.id === "accountb")!.payment === 0 ||
            isNaN(+accounts.find((a) => a.id === "accountb")!.payment))
        ) {
          newErrors.noaccountbPayment = true;
        } else if (
          +accounts.find((a) => a.id === "accountb")!.payment * 100 >
          accounts.find((a) => a.id === "accountb")!.balance
        ) {
          newErrors.accountbPaymentOverBalance = true;
        }

        if (
          accounts.find((a) => a.id === "accountc")!.selected &&
          (+accounts.find((a) => a.id === "accountc")!.payment === 0 ||
            isNaN(+accounts.find((a) => a.id === "accountc")!.payment))
        ) {
          newErrors.noaccountcPayment = true;
        } else if (
          +accounts.find((a) => a.id === "accountc")!.payment * 100 >
          accounts.find((a) => a.id === "accountc")!.balance
        ) {
          newErrors.accountcPaymentOverBalance = true;
        }

        if (!Object.values(newErrors).includes(true)) {
          handleSubmit(true);
        }
        setErrors(newErrors);
      }}
    >
      <PaymentInformationSection
        errors={errors}
        setErrors={setErrors}
        paymentInformation={paymentInformation}
        setPaymentInformation={setPaymentInformation}
      />
      <PaymentDetailSection
        errors={errors}
        setErrors={setErrors}
        totalPayment={totalPayment}
        setTotalPayment={setTotalPayment}
        accounts={accounts}
        setAccounts={setAccounts}
      />
      <AccountListsSection
        errors={errors}
        setErrors={setErrors}
        accounts={accounts}
        setAccounts={setAccounts}
        totalPayment={totalPayment}
        setTotalPayment={setTotalPayment}
      />
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 h-10 min-h-10 text-zinc-100 rounded-md"
      >
        Submit
      </button>
    </form>
  );
};

export default PaymentForm;
