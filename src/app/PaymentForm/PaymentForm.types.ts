import { Dispatch, SetStateAction } from "react";

export interface PaymentInformation {
  accountNumber: number | undefined;
  routingNumber: number | undefined;
  confirmationAccountNumber: number | undefined;
  accountType: "Checking" | "Savings" | undefined;
}

export interface PaymentFormErrors {
  accountNumberIsEmpty: boolean;
  confirmationIsEmpty: boolean;
  confirmationIsMismatched: boolean;
  routingNumberIsEmpty: boolean;
  noAccountType: boolean;
  noSelectedAccounts: boolean;
  noTotalPayment: boolean;
  totalPaymentOverBalance: boolean;
  noaccountaPayment: boolean;
  accountaPaymentOverBalance: boolean;
  noaccountbPayment: boolean;
  accountbPaymentOverBalance: boolean;
  noaccountcPayment: boolean;
  accountcPaymentOverBalance: boolean;
}

export interface Account {
  id: string;
  name: string;
  balance: number;
  payment: number | undefined;
  selected: boolean;
}

export interface PaymentFormProps {
  handleSubmit: () => null;
}

export interface PaymentInformationSectionProps {
  errors: PaymentFormErrors;
  setErrors: Dispatch<SetStateAction<PaymentFormErrors>>;
  paymentInformation: PaymentInformation;
  setPaymentInformation: Dispatch<SetStateAction<PaymentInformation>>;
}

export interface PaymentDetailSectionProps {
  errors: PaymentFormErrors;
  setErrors: Dispatch<SetStateAction<PaymentFormErrors>>;
  totalPayment: string | undefined;
  setTotalPayment: Dispatch<SetStateAction<string | undefined>>;
  accounts: Account[];
  setAccounts: Dispatch<SetStateAction<Account[]>>;
}

export interface AccountsListsSectionProps {
  errors: PaymentFormErrors;
  setErrors: Dispatch<SetStateAction<PaymentFormErrors>>;
  totalPayment: string | undefined;
  setTotalPayment: Dispatch<SetStateAction<string | undefined>>;
  accounts: Account[];
  setAccounts: Dispatch<SetStateAction<Account[]>>;
}

export interface PriceInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  handleChange: (e: Event) => null;
  disabled: boolean;
  alignment: "left" | "right";
  id: string;
  errors: PaymentFormErrors;
  errorNames: string[];
  setErrors: Dispatch<SetStateAction<PaymentFormErrors>>;
}
