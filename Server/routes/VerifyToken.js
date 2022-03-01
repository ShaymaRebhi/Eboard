const jwt = require("jsonwebtoken")

module.exports =function(req,res,text){
    const token =req.header('auth-token');
    if(!token)res.status(401).send('Access Denied');
    try{
        const verified =jwt.verify(token,process.env.JWT_SECRET);
        req.user=verified;
        next();

    }catch(err){
       return res.status(400).send("invalid token");
    }
}