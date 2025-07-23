const jwt=require('jsonwebtoken')
const JWT_SECRET="wnfnja14871487675b2hjghv12tybhjfvjwyf67"

function userAuth(req, res, next){
    const userId=req.headers.auth;
    const token=jwt.verify(userId, JWT_SECRET);

    if(!token){
        res.status(404).json({
            messsage: 'no user found'
        });
    }
    req.userId=token.userId
    next();
}

module.exports={
    JWT_SECRET, userAuth
}