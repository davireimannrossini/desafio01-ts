import { CompanyAccount } from "./class/CompanyAccount";
import { PeopleAccount } from "./class/PeopleAccount";
import { BonusAccount } from "./class/BonusAccount";
import { DioAccount } from "./class/DioAccount";
import PromptSync from "prompt-sync";

const prompt = PromptSync();

const accounts: DioAccount[] = [
  new PeopleAccount(123456789, "Davi Rossini (PF)", 1001),
  new CompanyAccount("Rossini Corp (PJ)", 2002),
  new BonusAccount("Savings (Bonus)", 3003)
];

let myAcc: DioAccount | undefined;
let keepRunning = true;

const clearConsole = () => {
    process.stdout.write('\x1Bc'); 
};

const checkInitialDeposit = (acc: DioAccount) => {
  if (acc.getBalance() === 0) {
    console.log(`\n[Notice] ${acc.getName()}, your balance is R$0.00.`);
    const answer = prompt("Would you like to make a deposit now? (y/n): ");
    
    if (answer.toLowerCase() === 'y') {
      const amount = Number(prompt("Enter amount to deposit: "));
      if (!isNaN(amount) && amount > 0) {
        acc.deposit(amount);
        console.log("Deposit successful!");
      } else {
        console.log("Invalid amount.");
      }
    }
  }
};

const selectAccount = (): DioAccount | undefined => {
  clearConsole();
  console.log("--- Current Available Accounts ---");
  accounts.forEach((acc, index) => {
      console.log(`Account [${index + 1}]: ${acc.getName()} | Balance: R$${acc.getBalance()}`);
  });
  
  console.log("\nSelect the account you want to use:");
  const selection = prompt("Enter the account number (or 'exit' to quit): ");
  
  if (selection.toLowerCase() === 'exit') return undefined;

  const index = Number(selection) - 1;
  if (index >= 0 && index < accounts.length) {
    const selected = accounts[index];
    checkInitialDeposit(selected);
    return selected;
  } else {
    console.log("Invalid option. Try again.");
    prompt("Press Enter to continue...");
    return selectAccount();
  }
};

myAcc = selectAccount();
if (!myAcc) keepRunning = false;

while (keepRunning && myAcc) {
  clearConsole();
  console.log(`\n=================================`);
  console.log(`LOGGED IN: ${myAcc.getName()}`);
  console.log(`CURRENT BALANCE: R$${myAcc.getBalance()}`);
  console.log(`---------------------------------`);
  console.log(`(1) Check Balance`);
  console.log(`(2) Withdraw`);
  console.log(`(3) Deposit`);
  console.log(`(4) Get a Loan (PJ Only)`);
  console.log(`(5) Switch Account`);
  console.log(`(6) Exit`);
  console.log(`=================================`);

  const operation = prompt("Operation: ");
  clearConsole();

  switch (operation) {
    case "1":
      console.log(`\nBalance: R$${myAcc.getBalance()}`);
      break;
    case "2":
      const wVal = Number(prompt("Withdraw amount: "));
      myAcc.withdraw(wVal);
      break;
    case "3":
      const dVal = Number(prompt("Deposit amount: "));
      myAcc.deposit(dVal);
      break;
    case "4":
      if (myAcc instanceof CompanyAccount) {
        const lVal = Number(prompt("Loan amount: "));
        myAcc.getLoan(lVal);
      } else {
        console.log("\n[Error] Loans only available for Company Accounts.");
      }
      break;
    case "5":
      const nextAcc = selectAccount();
      if (nextAcc) {
        myAcc = nextAcc;
      }
      break;
    case "6":
      console.log("\nThank you! See you soon!");
      keepRunning = false;
      break;
    default:
      console.log("\nInvalid option!");
  }
  
  if (keepRunning) {
    prompt("Press Enter to return to the main menu...");
  }
}
