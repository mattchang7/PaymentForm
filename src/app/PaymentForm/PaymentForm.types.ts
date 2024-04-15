import { Dispatch, SetStateAction } from "react";

export interface PaymentInformation {
  accountNumber: string;
  routingNumber: string;
  confirmationAccountNumber: string;
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
  payment: string;
  selected: boolean;
}

export interface PaymentFormProps {
  handleSubmit: Dispatch<SetStateAction<boolean>>;
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
  totalPayment: string;
  setTotalPayment: Dispatch<SetStateAction<string>>;
  accounts: Account[];
  setAccounts: Dispatch<SetStateAction<Account[]>>;
}

export interface AccountsListsSectionProps {
  errors: PaymentFormErrors;
  setErrors: Dispatch<SetStateAction<PaymentFormErrors>>;
  totalPayment: string;
  setTotalPayment: Dispatch<SetStateAction<string>>;
  accounts: Account[];
  setAccounts: Dispatch<SetStateAction<Account[]>>;
}

export interface PriceInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>> | ((newValue: string) => void);
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  alignment: "left" | "right";
  id: string;
  errors: PaymentFormErrors;
  errorNames: string[];
}

export interface CalculateProRateProps {
  accounts: Account[];
  newPayment: number;
}
