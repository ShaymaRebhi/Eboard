const Teacher =require('../Model/Teacher')
const Organization =require('../Model/Organization')
const Admin=require('../Model/Admin')
const _=require("lodash")
const uuid=require("uuid").v4;
const stripe=require("stripe")("sk_test_51KueAAKTa1h49sQ0ZbAsoClaV15SGKak9CA9rtbFPv2tWfSW5R1AbQHnom3K71LXDkljvsS8F1ru3tyeGPN2bur000WcniGtTW");


exports.getAll= async (req,res) =>{

    Organization.find({}).populate('User').then(organization=>{
        if(!organization) return res.status(500).json({error:'error'});
        return res.status(200).json(organization);
    }).catch(err=>{
        console.log(err);
    }) 
}

exports.getUserById=async(req,res)=>{
    Organization.find({_id:req.params.id}).populate('User').then(organization=>{
       if(!organization) return res.status(520).send("error");
       return res.status(200).json(organization);
   }).catch(err=>{
        return res.status(500).send("error");
   })
}

exports.payement=async(req,res)=>{
    const {idOrganization,amount,token}=req.body;
    Organization.findOne({_id:idOrganization}).then(org=>{
        console.log(idOrganization)
        console.log(amount)
        console.log(token.card.brand)
        let objct={
            Payement:true
        }
        orga=_.extend(org,objct);
        orga.save((err,organ)=>{
            if(err) return res.status(500).json({error:err})
            if(organ)return res.status(200).json(organ);
        })
        Admin.updateMany({}, {
            $inc:{returned: amount} 
        }, {
            multi: true
        }, (err, data) => {
            
        });

    }).catch(erreur=>console.log(erreur));
    

}

