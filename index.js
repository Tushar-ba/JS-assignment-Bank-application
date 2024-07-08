class BankAccount{
    constructor(accountNumber, owner, balance=0, transactionHistory=[]){
        this.accountNumber=accountNumber;
        this.owner = owner;
        this.balance = balance;
        this.transactionHistory=transactionHistory;
    }

    deposit(amount){
        this.balance += amount;
        this.recordTransaction('deposit',amount)
    }
    withdraw(amount){
        if(amount<=this.balance){
            this.balance -= amount;
        }
        else{
            console.log("insufficient balance")
        }
        this.recordTransaction('withdraw',amount)
    }

    getAccountDetails(){
        return{
            accountNumber:this.accountNumber,
            owner:this.owner,
            balance: this.balance,
            transactionHistory:this.transactionHistory
        }
    }

    recordTransaction(type, amount, relatedAccount = null){
        const transaction = {
            type,
            amount,
            date: new Date(),
            relatedAccount
        };
        this.transactionHistory.push(transaction)
        }

        transfer(amount, recipientAccount){
            if(amount <= this.balance){
                this.withdraw(amount);
                recipientAccount.deposit(amount);
                this.recordTransaction('transfer',amount,recipientAccount.accountNumber)
            }else{
                console.log("Insufficient funds")
            }
        }











    }


let b1 = new BankAccount(123,"tus",100,[0,1,3]);

b1.deposit(500);
b1.withdraw(100);
b1.recordTransaction('deposit',500,'1232132');
b1.transfer('500',1234)
console.log(b1.getAccountDetails());