var jwt = require("jsonwebtoken");
const JWT_SECRET = "ABipateriya";
const fetchuser=(req,res,next)=>{
//get the user from jwt token and add id to request
const token=req.header("auth-token")

if(!token){
    res.status(401).send({error:"please authenticate using valod token"})
}
try {const data=jwt.verify(token,JWT_SECRET)
    req.user=data
        next()
    
} catch (error) {
    res.status(401).send({error:"please authenticate using valod token"})
}

} 
module.exports=fetchuser;