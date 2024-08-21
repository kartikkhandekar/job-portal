const Recruiter=require('../model/recruiter-model')
const recruiterValidationSchema={
    userId:{
        custom:{
            options:async function(value,{req}){
                const recruiter=await Recruiter.findOne({userId:req.user.id})
                if(recruiter){
                    throw new Error('Profile already taken')
                }else {
                    return true
                }
            }
        }
    },
    companyName:{
        in:['body'],
        exists:{
            errorMessage:'companyName is required'
        },
        notEmpty:{
            errorMessage:'companyName cannot be empty'
        },
        trim:true
    },
    email:{
        in:['body'],
        isEmail:{
            errorMessage:'invalid email'
        },
        exists:{
            errorMessage:'email is required'
        },
        notEmpty:{
            errorMessage:'email cannot be empty'
        },
        trim:true,
        normalizeEmail:true,
        custom:{
            options:
            async function(value){
                const recruiter= await Recruiter.findOne({email:value})
                 if(recruiter){
                    throw new Error("email already taken")
                 }else {
                    return true
                 }
            }
        }
    },
    website:{
        in:['body'],
        exists:{
            errorMessage:"website is required"
        },
        notEmpty:{
            errorMessage:'website cannot be empty'
        },
        trim:true
    },
    address:{
        in:['body'],
        exists:{
            errorMessage:"address is required"
        },
        notEmpty:{
            errorMessage:'address cannot be empty'
        },
        trim:true

    }
}

const recruiterEditValidationSchema={
    companyName:{
        in:['body'],
        exists:{
            errorMessage:'companyName is required'
        },
        notEmpty:{
            errorMessage:'companyName cannot be empty'
        },
        trim:true
    }, 
    email:{
        in:['body'],
        isEmail:{
            errorMessage:'invalid email'
        },
        exists:{
            errorMessage:'email is required'
        },
        notEmpty:{
            errorMessage:'email cannot be empty'
        },
        trim:true,
        normalizeEmail:true
    },
    website:{
        in:['body'],
        exists:{
            errorMessage:"website is required"
        },
        notEmpty:{
            errorMessage:'website cannot be empty'
        },
        trim:true
    },
    address:{
        in:['body'],
        exists:{
            errorMessage:"address is required"
        },
        notEmpty:{
            errorMessage:'address cannot be empty'
        },
        trim:true

    }
}
module.exports={recruiterValidationSchema,
                 recruiterEditValidationSchema}