export abstract class DioAccount {
  private readonly name: string;
  private readonly accountNumber: number;
  private balance: number = 0;
  private status: boolean = true;

  constructor(name: string, accountNumber: number) {
    this.name = name;
    this.accountNumber = accountNumber;
  }

  getName = (): string => this.name;

  deposit = (value: number): void => {
    if (this.validateStatus() && value > 0) {
      this.balance += value;
      console.log(`You deposited: R$${value}`);
    }
  };

  withdraw = (value: number): void => {
    if (this.validateStatus() && this.balance >= value) {
      this.balance -= value;
      console.log(`You withdrew: R$${value}`);
    } else {
      console.log("Withdraw denied: Insufficient balance or inactive account.");
    }
  };

  getBalance = (): number => this.balance;

  protected setBalance = (value: number): void => {
    this.balance = value;
  };

  protected validateStatus = (): boolean => {
    if (this.status) return true;
    throw new Error("Invalid Account");
  };
}
