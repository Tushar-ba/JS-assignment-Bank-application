class BankAccount{
    constructor(accountNumber, owner, balance=0, transactionHistory=[]){
        this.accountNumber=accountNumber;
        this.owner = owner;
        this.balance = balance;
        this.transactionHistory=transactionHistory;
    }

    deposit(amount){
        this.balance += amount;
    }
    withdraw(amount){
        if(amount<=this.balance){
            this.balance -= amount;
        }
        else{
            console.log("insufficient balance")
        }
    }

}

let b1 = new BankAccount(123,"tus",100,[0,1,3]);

b1.deposit(500);
b1.withdraw(700)

console.log(b1);