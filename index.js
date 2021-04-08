const dataService = require('./services/data.service');
const express = require('express');
const session = require('express-session');
const app = express();

app.use(express.json());
app.use(session({
    secret : 'randomsecurestring',
    resave : false,
    saveUninitialized : false
}))

const logMiddleWare = (req,res,next)=>{
    console.log(req.body);
    next()
}
app.use(logMiddleWare);

const authMiddleWare = (req,res,next)=>{
    if(!req.session.currentUser)
    {
        return res.json({
            status: false,
            statusCode : 405,
            message: 'Please login'
        })
    }
    else{
        next();
    }
}
app.get('/',(req,res)=>{
    res.status(582).send('GET Method working')
})

app.post('/register',(req,res)=>{
    //res.send('POST Method')
    const result = dataService.register(req.body.acno,req.body.user,req.body.pass)
    //res.status(result.statusCode);
    console.log(res.status(result.statusCode).json(result));
})
app.post('/login',(req,res)=>{
    //res.send('POST Method')
    const result = dataService.login(req,req.body.acno,req.body.pass)
    console.log(res.status(result.statusCode).json(result));
})
app.post('/deposit',authMiddleWare,(req,res)=>{
    //res.send('POST Method')
    console.log(req.session.currentUser);
    const result = dataService.deposit(req,req.body.acno,req.body.pass,req.body.amount)
    console.log(res.status(result.statusCode).json(result));
})
app.post('/withdraw',authMiddleWare,(req,res)=>{
    //res.send('POST Method')
    const result = dataService.withdraw(req.body.acno,req.body.pass,req.body.amount)
    console.log(res.status(result.statusCode).json(result));
})
app.put('/',(req,res)=>{
    res.send('PUT Method')
})
app.patch('/',(req,res)=>{
    res.send('PATCH Method')
})
app.delete('/',(req,res)=>{
    res.send('DELETE Method')
})
app.listen(3000,()=>{
    console.log('Server is started at port 3000');
})
