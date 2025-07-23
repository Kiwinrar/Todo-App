const mongoose=require('mongoose');

const Schema=mongoose.Schema;
// const ObjectId=mongoose.ObjectId;

const UserSchema=new Schema({
    name: String,
    email: {type: String, unique: true},
    password: {type: String, required: true}
});

const TodoSchema=new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'user-informations'},
    task: {type: String},
    creation: {type: Date},
    markdone: {type: Boolean},
});

const UserInfoModule=mongoose.model('user-informations', UserSchema);
const TodoInfoModule=mongoose.model('todo-infomations', TodoSchema);

module.exports={
    UserInfoModule, TodoInfoModule
}