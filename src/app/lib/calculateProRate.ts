import { Account } from "../PaymentForm/PaymentForm.types";
export const calculateProRate = (
  accounts: Account[],
  newPayment: number
): Account[] => {
  const selectedBalances = accounts.reduce(
    (sum, a) => (a.selected ? sum + a.balance : sum),
    0
  );

  if (selectedBalances === 0)
    return accounts.map((a) => ({
      ...a,
      payment: "0",
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
          payment: "0",
        }
  );

  let remainingCents = Math.round(
    newPayment * 100 -
      initialDistribution.reduce(
        (sum, a) => (a.selected ? sum + +a.payment : sum),
        0
      )
  );
  let i = 0;
  while (remainingCents > 0) {
    if (initialDistribution[i % initialDistribution.length].selected) {
      initialDistribution[i % initialDistribution.length].payment =
        +initialDistribution[i % initialDistribution.length].payment + 1;
      remainingCents--;
    }
    i++;
  }
  return initialDistribution.map((a) => ({
    ...a,
    payment: (+a.payment / 100).toFixed(2),
  }));
};
