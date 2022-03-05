//VALIDATION
const joi =require('@hapi/joi')



 const signupValidation =(data)=>{
    const schema=joi.object({
        FirstName:joi.string().min(6).required(),
        LastName:joi.string().min(6).required(),
        email:joi.string().min(6).required().email(),
        Password:joi.string().min(6).required(),
        role:joi.string().min(5).required(),
        Sexe:joi.string().min(5).max(5).required(),
        Adresse:joi.string().min(6).required(),
        BirthDate:joi.string().min(6).required().isoDate()
    });

    return schema.validate(data);

};
const StudentAndTeacherValidation =(data)=>{
    const schema=joi.object({
        FirstName:joi.string().min(6).required(),
        LastName:joi.string().min(6).required(),
        Sexe:joi.string().min(5).max(5).required(),
        BirthDate:joi.string().min(6).required().isoDate(),
        Cin:joi.number().min(8).max(8).required(),
        Etat:joi.boolean().required()
    });

    return schema.validate(data);

};



const loginValidation =(data)=>{
    const schema=joi.object({
        email:joi.string().min(6).required().email(),
        Password:joi.string().min(4).required()
    });

    return schema.validate(data);

};
module.exports.signupValidation=signupValidation;
module.exports.loginValidation=loginValidation;
module.exports.StudentAndTeacherValidation=StudentAndTeacherValidation;