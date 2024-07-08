class BankAccount{
    constructor(accountNumber, owner, balance=0, transactionHistory=[]){
        this.accountNumber=accountNumber;
        this.owner = owner;
        this.balance = balance;
        this.transactionHistory=transactionHistory;
    }
}

let b1 = new BankAccount(123,"tus",100,[0,1,3]);


console.log(b1);