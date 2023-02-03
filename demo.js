function makeBank() {
  let accounts = [];

  return {
    nextAccountNum: 100,
    fetchAcctNumber() {
      this.nextAccountNum += 1;
      return this.nextAccountNum;
    },
    
    openAccount() {
      let newAccount = makeAccount(this.fetchAcctNumber());
      accounts.push(newAccount);
      return newAccount;
    },

    transfer(source, destination, amount) {
      return destination.deposit(source.withdraw(amount));
    },
  }
}

function makeAccount(acctNumber) {
  let number = acctNumber;
  let balance = 0;
  let transactions = [];
  
  return {
    number() { return number },
    balance() { return balance },
    transactions() { return transactions },
    deposit(amount) {
      balance += amount;
      transactions.push({type: "deposit", amount});
      return amount;
    },

    withdraw(amount) {
      if (amount > this.balance()) {
        amount = this.balance();
      }

      balance -= amount;
      transactions.push({type: "withdraw", amount});
      return amount;
    },
  }
}

// console.log(account.balance);
// // 0
// console.log(account.deposit(12));
// // 12
// console.log(account.balance);
// // 12
// console.log(account.deposit(10));
// // 10
// console.log(account.balance);
// // 22

// console.log(account.deposit(100));
// console.log(account.balance);
// // 100
// console.log(account.withdraw(19));
// // 19
// console.log(account.balance);
// // 81
// console.log(account.balance);
// // 81
// console.log(account.withdraw(91));
// // 81
// console.log(account.balance);
// // 0

// console.log(account.deposit(23));
// // 23
// console.log(account.transactions);
// // [{...}]
// console.log(account.transactions[0]);
// // {type: "deposit", amount: 23}

// let account = makeAccount();
// console.log(account.deposit(15));
// // 15
// console.log(account.balance);
// // 15
// let otherAccount = makeAccount();
// console.log(otherAccount.balance);
// // 0

// let bank = makeBank();
// console.log(bank.accounts);
// // []

// let bank = makeBank();
// let account = bank.openAccount();
// console.log(account.number);
// // 101
// console.log(bank.accounts);
// // [{...}]
// console.log(bank.accounts[0]);
// // {number: 101, balance: 0, transactions: Array[0]}
// let secondAccount = bank.openAccount();
// console.log(secondAccount.number);
// // 102

// let bank = makeBank();
// let source = bank.openAccount();
// console.log(source.deposit(10));
// // 10
// let destination = bank.openAccount();
// console.log(bank.transfer(source, destination, 7));
// // 7
// console.log(source.balance);
// // 3
// console.log(destination.balance);
// // 7

// let bank = makeBank();
// let account = bank.openAccount();
// let account2 = bank.openAccount();
// console.log(account.balance());
// // 0
// console.log(account.deposit(17));
// // 17
// let secondAccount = bank.openAccount();
// console.log(secondAccount.number());
// // 102
// console.log(account.transactions());
// // [{...}]
// console.log(account.deposit(100));
// console.log(account.balance());
// console.log(account.withdraw(45));
// console.log(account.balance());
// console.log(bank.transfer(account, account2, 25));
// console.log(account.transactions());

let bank = makeBank();
console.log(bank.accounts);
// undefined