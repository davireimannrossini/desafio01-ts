import { DioAccount } from "./DioAccount";

export class BonusAccount extends DioAccount {
  deposit = (value: number): void => {
    if (this.validateStatus() && value > 0) {
      const finalValue = value + 10;
      this.setBalance(this.getBalance() + finalValue);
      console.log(`Savings Deposit! You deposited R$${value} and received R$${finalValue}`);
    }
  };
}
