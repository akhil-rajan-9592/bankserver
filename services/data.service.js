let accountDetails ={
    1000:{acno:1000,name:"Akhil",balance:5000,password:"user1"},
    1002:{acno:1002,name:"Rajan",balance:3000,password:"user2"},
    1003:{acno:1003,name:"Amaya",balance:4000,password:"user3"},
    1004:{acno:1004,name:"Anaya",balance:3500,password:"user4"},
    1005:{acno:1005,name:"Nayana",balance:2000,password:"user5"}
  }
let currentUser;
const register = (acno,name,password) =>{
    if(acno in accountDetails)
    {
         return {
             status:false,
             statusCode:422,
             message:"User already Exist. Please login"
         }
    }
    else{
        accountDetails[acno]={
            acno,
            name,
            balance:0,
            password
        }
        return {
            status:true,
            statusCode : 200,
            message:"Registration Successful"
        }
    }
}

    const login = (req,acno,password)=>{
        if(acno in accountDetails){
        if(password == accountDetails[acno].password){
            req.session.currentUser = accountDetails[acno];
            return {
                status:true,
                statusCode : 200,
                message:"Login Successful"
            }
        }
        else{
            return {
                status:false,
                statusCode : 422,
                message:"Incorrect Password"
            }
        }
        }
        else{
            return {
                status:false,
                statusCode : 422,
                message:"User Not Exist. Please try again"
            }
        }
    }

    const deposit = (req,acno,password,amount)=>{
        // if(!req.session.currentUser)
        // {
        //     return {
        //         status:false,
        //         statusCode : 401,
        //         message:"Please Login"
        //     }
        // }
        if(acno in accountDetails){
            if(password == accountDetails[acno].password){
                let existingAmount = accountDetails[acno].balance;
                let newAmount = parseInt(existingAmount)+parseInt(amount);
                accountDetails[acno].balance = newAmount;
                //console.log(this.accountDetails);
                return {
                    status:true,
                    statusCode : 200,
                    message:"Your deposit has been credited",
                    balance : "Your balance : "+accountDetails[acno].balance
                }
            }
            else{
                return {
                    status:false,
                    statusCode : 422,
                    message:"Your Deposit is Not Success"
                }
            }
        }
        else{
            return {
                status:false,
                statusCode : 422,
                message:"Your Deposit is Not Success"
            }
        }
    }
    const withdraw = (acno,password,amount)=>{
        if(acno in accountDetails){
            if(password == accountDetails[acno].password){
                let existingAmount = accountDetails[acno].balance;
                if(existingAmount >= amount){
                    let newAmount = parseInt(existingAmount)-parseInt(amount);
                    accountDetails[acno].balance = newAmount;
                    //console.log(this.accountDetails);
                    return {
                        status:true,
                        statusCode : 200,
                        message:"Your withdraw has been success",
                        balance : "Your balance : "+accountDetails[acno].balance
                    }
                }
                else{
                    return {
                        status:false,
                        statusCode : 422,
                        message:"Low balance in your account"
                    }
                }
            }
            else{
                return {
                    status:false,
                    statusCode : 422,
                    message:"Invalid data"
                }
            }
        }
        else{
            return {
                status:false,
                statusCode : 422,
                message:"Invalid Data"
            }
        }
    }    
  
module.exports = {
    register,
    login,
    deposit,
    withdraw
}