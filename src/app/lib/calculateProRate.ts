import { Account } from "../PaymentForm/PaymentForm.types";

// Calculates prorated payments and returns a new accounts array with updated payment values
// Uses the largest remainder method, which ensures quotients which add up to the dividend over the most precise rounding
export const calculateProRate = (
  accounts: Account[],
  newPayment: number
): Account[] => {
  // Only add balances of selected accounts
  const selectedBalances = accounts.reduce(
    (sum, a) => (a.selected ? sum + a.balance : sum),
    0
  );

  if (selectedBalances === 0)
    return accounts.map((a) => ({
      ...a,
      payment: "0",
    }));

  // The first distribution divides the payment proportionally, rounded down to the nearest cent
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

  // Tracks the remainder, in cents
  let remainingCents = Math.round(
    newPayment * 100 -
      initialDistribution.reduce(
        (sum, a) => (a.selected ? sum + +a.payment : sum),
        0
      )
  );

  // Loops through the remaining cents, adding one to each selected account until none remain
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
