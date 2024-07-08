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

    getAccountDetails(){
        return{
            accountNumber:this.accountNumber,
            owner:this.owner,
            balance: this.balance,
            transactionHistory:this.transactionHistory
        }
    }

}

let b1 = new BankAccount(123,"tus",100,[0,1,3]);

b1.deposit(500);
b1.withdraw(100);
b1.getAccountDetails()

console.log(b1.getAccountDetails());