const Chat = require("../Model/Chat");

exports.addMsg= async(req,res,next)=>{
try{
    const {from,to,message} =req.body;  
    const data=await Chat.create({
        message:{text:message},
        users:[from,to],
        sender:from
    })
    if(data) return res.status(200).json({msg:"Message added successfuly "});
    return res.status(520).json({error :"failed to add message to data base "}); 
}catch(ex){

   return res.status(500).json({error :ex}); 
}
}

exports.getAllMsg= async(req,res,next)=>{
    try {
        const { from, to } = req.body;
    
        const messages = await Chat.find({
          users: {
            $all: [from, to],
          },
        }).sort({ updatedAt: 1 });
    
        const projectedMessages = messages.map((msg) => {
          return {
            fromSelf: msg.sender.toString() === from,
            message: msg.message.text,
          };
        });
        res.json(projectedMessages);
      } catch (ex) {
        next(ex);
      }
}
