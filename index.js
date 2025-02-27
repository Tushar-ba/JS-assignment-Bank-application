class BankAccount {
    constructor(accountNumber, owner, balance = 0, transactionHistory = []) {
      this.accountNumber = accountNumber;
      this.owner = owner;
      this.balance = balance;
      this.transactionHistory = transactionHistory;
    }
  
    deposit(amount) {
      this.balance += amount;
      this.recordTransaction('deposit', amount);
      this.saveToLocalStorage();
    }
  
    withdraw(amount) {
      if (amount <= this.balance) {
        this.balance -= amount;
        this.recordTransaction('withdraw', amount);
        this.saveToLocalStorage();
      } else {
        console.log('Insufficient funds');
      }
    }
  
    transfer(amount, recipientAccount) {
      if (amount <= this.balance) {
        this.withdraw(amount);
        recipientAccount.deposit(amount);
        this.recordTransaction('transfer', amount, recipientAccount.accountNumber);
        recipientAccount.recordTransaction('received', amount, this.accountNumber);
        this.saveToLocalStorage();
        recipientAccount.saveToLocalStorage();
      } else {
        console.log('Insufficient funds');
      }
    }
  
    addInterest(rate) {
      const interest = this.balance * (rate / 100);
      this.deposit(interest);
      this.recordTransaction('interest', interest);
      this.saveToLocalStorage();
    }
  
    getAccountDetails() {
      return {
        accountNumber: this.accountNumber,
        owner: this.owner,
        balance: this.balance,
        transactionHistory: this.transactionHistory
      };
    }
  
    recordTransaction(type, amount, relatedAccount = null) {
      const transaction = {
        type,
        amount,
        date: new Date(),
        relatedAccount
      };
      this.transactionHistory.push(transaction);
    }
  
    saveToLocalStorage() {
      const accounts = JSON.parse(localStorage.getItem('accounts')) || {};
      accounts[this.accountNumber] = this.getAccountDetails();
      localStorage.setItem('accounts', JSON.stringify(accounts));
    }
  
    static loadFromLocalStorage(accountNumber) {
      const accounts = JSON.parse(localStorage.getItem('accounts')) || {};
      if (accounts[accountNumber]) {
        const { owner, balance, transactionHistory } = accounts[accountNumber];
        return new BankAccount(accountNumber, owner, balance, transactionHistory);
      }
      return null;
    }
  }
  


// let b1 = new BankAccount(123,"tus",100,[0,1,3]);

// b1.deposit(500);
// b1.withdraw(100);
// b1.recordTransaction('deposit',500,'1232132');
// // b1.transfer('500',1234)
// b1.addInterest(60)
// console.log(b1.getAccountDetails());


let bankAccount;


function createAccount(){
    const accountNumber = document.getElementById('accountNumber').value;
    const owner = document.getElementById('owner').value;
    bankAccount = new BankAccount(accountNumber,owner);
    bankAccount.saveToLocalStorage();
    document.getElementById('accountInfo').style.display='block';
    console.log(bankAccount)
    updateAccountDetails();
}

function loadAccount(){
    const accountNumber = document.getElementById('accountNumber').value;
    bankAccount = BankAccount.loadFromLocalStorage(accountNumber);
    if(bankAccount){
        document.getElementById('owner').value=bankAccount.owner;
        document.getElementById('accountInfo').style.display='block';
        updateAccountDetails();
    }
    else{
        alert('acc not found')
    }
}
function deposit() {
    const amount = parseFloat(document.getElementById('depositAmount').value);
    bankAccount.deposit(amount);
    updateAccountDetails();
  }

  function withdraw() {
    const amount = parseFloat(document.getElementById('withdrawAmount').value);
    bankAccount.withdraw(amount);
    updateAccountDetails();
  }

  function transfer(){
    const recipientAccountNumber = document.getElementById('recipientAccountNumber').value;
    const amount = parseFloat(document.getElementById('transferAmount').value);
    let recipientAccount = BankAccount.loadFromLocalStorage(recipientAccountNumber);
    if(!recipientAccount){
        alert('recipient does not exist')
    }
    bankAccount.transfer(amount,recipientAccount);
    updateAccountDetails();
  }

  function addInterest(){
    const rate = parseFloat(document.getElementById('interestRate').value);
    bankAccount.addInterest(rate);
    updateAccountDetails();
    updateAccountDetails();
  }


  function updateAccountDetails() {
    const details = bankAccount.getAccountDetails();
    document.getElementById('accountDetails').innerText = `Account Number: ${details.accountNumber}, Owner: ${details.owner}, Balance: ${details.balance}`;
    const transactionHistory = document.getElementById('transactionHistory');
    transactionHistory.innerHTML = '';
    details.transactionHistory.forEach(transaction => {
      const li = document.createElement('li');
      li.innerText = `${transaction.date.toLocaleString()} - ${transaction.type} - $${transaction.amount} ${transaction.relatedAccount ? `(Related Account: ${transaction.relatedAccount})` : ''}`;
      transactionHistory.appendChild(li);
    });
  }

