const express=require('express');

const mongoose=require('mongoose');

const { userRouter }=require('./routes/userInfo')
const { todoRouter }=require('./routes/todoInfo')

const app=express();
app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/user/tasks', todoRouter);

async function main(){
    await mongoose.connect('mongodb+srv://kiwinrar:FodbqILmj81wl1Jb@mydatabase.f1trx.mongodb.net/Todoapp');
    app.listen(3000,()=>{
    console.log('Server is running on port 3000');
    }
    );
}

main();