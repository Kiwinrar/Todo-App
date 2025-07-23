const { Router, response }=require('express');
const { UserInfoModule } = require('../db');

const jwt=require('jsonwebtoken');
const { JWT_SECRET }=require('../middleware/userAuth');

const userRouter=Router();

userRouter.post('/signup', async (req, res)=>{
    try{
    const {name, email, password}=req.body;
    const response=await UserInfoModule.create({
        name: name,
        email: email,
        password: password
    })
    if(!response){
        res.json({
            message: 'Error in creating database entries'
        });
    }
    res.json({
        message: 'the signup is complete'
    })
    }
    catch(err){
        res.json({
            ErrorMsg: err
        });
    }
    finally{
        console.log('the signup endpoint for user'+response.name+' is complete')
    }
}
);

userRouter.post('/signin', async (req, res)=>{
    try{
        const { name, password }=req.body;
        const response=await UserInfoModule.findOne({
            name: name,
            password: password
        });
        if(!response){
            res.status(403).send({message: 'no such user found'});
        }
        const token=jwt.sign({
            userId: response._id.toString()
        }, JWT_SECRET);

        res.status(200).send({token: token})
    }
    catch(err){
        res.status(403).send({message: err})
    }
    finally{
        console.log("the signin endpoint of user"+response.name+"is complete")
    }
});

module.exports={
    userRouter
}