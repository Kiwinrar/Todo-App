const { Router } = require('express');
const { TodoInfoModule }=require('../db')
const todoRouter = Router();
const {userAuth}=require('../middleware/userAuth')

todoRouter.post('/todo', userAuth, async(req, res)=>{
    try{
    const userId=req.userId;
    const { task, markdone}=req.body;
    const creation=new Date();
    const response=await TodoInfoModule.create({
        userId: userId,
        task: task,
        creation: creation,
        markdone: markdone
    })
    if(!response){
        res.status(403).send({message: 'error in creation of todo'});
    }
    res.status(200).send({
        message: 'todo successfully created'
    })

    }
    catch(err){
        res.status(403).send({message: err})
    }
    finally{
        console.log('the todo for user with id '+userId+'is successfully created')
    }
});

todoRouter.get('/myTodo', userAuth, async(req, res)=>{
    const userId=req.userId;
    const response=await TodoInfoModule.find({
        userId: userId
    }).populate('userId').exec();
    if(!response){
        res.status(403).send({
            message: 'No such user found'
        });
    }
    res.status(200).send({response});
});

todoRouter.post('/mark', userAuth, async(req, res)=>{
    const {task, markdone}=req.body;
    const response = await TodoInfoModule.updateOne({
        task: task
    },{
        markdone: markdone
    });

    if (response.matchedCount === 0) {
        return res.status(404).send({
            message: 'Task not found'
        });
    }
    
    if(!response){
        res.status(403)
    }
    console.log(response)
    res.status(200).send({
        response: 'the task is mark as done'
    })
});

module.exports={
    todoRouter
}