import { calculateProRate } from "../lib";
import "@testing-library/jest-dom";

describe("calculateProRate", () => {
  // The function should correctly calculate the pro-rated payment for each selected account based on their balance and the total balance of all selected accounts.
  it("should correctly calculate the pro-rated payment for each selected account", () => {
    const accounts = [
      { selected: true, balance: 100 },
      { selected: true, balance: 200 },
      { selected: false, balance: 300 },
    ];
    const newPayment = 500;

    const result = calculateProRate(accounts, newPayment);

    expect(result).toEqual([
      { selected: true, balance: 100, payment: "166.67" },
      { selected: true, balance: 200, payment: "333.33" },
      { selected: false, balance: 300, payment: "0.00" },
    ]);
  });

  it("should correctly handle cases where the new payment amount is 0", () => {
    const accounts = [
      { selected: true, balance: 100 },
      { selected: true, balance: 200 },
      { selected: false, balance: 300 },
    ];
    const newPayment = 0;

    const result = calculateProRate(accounts, newPayment);

    expect(result).toEqual([
      { selected: true, balance: 100, payment: "0.00" },
      { selected: true, balance: 200, payment: "0.00" },
      { selected: false, balance: 300, payment: "0.00" },
    ]);
  });

  it("should return an array of accounts with payment set to 0 when no accounts are selected", () => {
    const accounts = [
      { selected: false, balance: 100 },
      { selected: false, balance: 200 },
      { selected: false, balance: 300 },
    ];
    const newPayment = 500;

    const result = calculateProRate(accounts, newPayment);

    expect(result).toEqual([
      { selected: false, balance: 100, payment: 0 },
      { selected: false, balance: 200, payment: 0 },
      { selected: false, balance: 300, payment: 0 },
    ]);
  });

  it("should correctly round the prorates using largest remainder method", () => {
    const accounts = [
      { selected: true, balance: 45156 },
      { selected: true, balance: 14901 },
      { selected: true, balance: 5438 },
    ];
    const newPayment = 40000.33;

    const result = calculateProRate(accounts, newPayment);

    expect(result).toEqual([
      { selected: true, balance: 45156, payment: "27578.52" },
      { selected: true, balance: 14901, payment: "9100.62" },
      { selected: true, balance: 5438, payment: "3321.19" },
    ]);
  });
});
