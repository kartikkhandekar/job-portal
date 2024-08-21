const User=require('../model/user-model')
const userValidationSchema={
    username:{
        exists:{
            errorMessage:'username is required'
        },
        notEmpty:{
            errorMessage:'username should not be empty'
        },
        trim:true
 
    },
    email:{
        exists:{
            errorMessage:'Email is required'
        },
        notEmpty:{
            errorMessage:'Email should not be empty'
        }, 
        isEmail:{
            errorMessage:'invalid email'
        },
        trim:true,
        normalizeEmail:true,
        custom:{
            options:
                async function (value)
                {
                      const user=await User.findOne({email:value})
                      if(user)
                      {
                        throw new Error('email already taken')
                      }
                      else
                      {
                        return true
                      }
                }
            
        }

    },
    password:{
        exists:{
            errorMessage:'password is required'
        },
        notEmpty:{
            errorMessage:'username should not be empty'
        },trim:true,
        isLength:{
            options:{min:8,max:128},
            errorMessage:'password should be between 8 to 128'
        }
    },
    role:{
        exists:{
            errorMessage:'role is required'
        },
        notEmpty:{
            errorMessage:'username should not be empty'
        },
        trim:true,
        isIn: {
            options: [['candidate', 'recruiter']],
            errorMessage: 'role should either be a candidate or recruiter'
        }
    }
}

module.exports=userValidationSchema