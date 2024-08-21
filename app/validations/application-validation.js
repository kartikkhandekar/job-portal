const Application = require('../model/application-model')
const applicationValidationSchema = {
    job: {
        in: ['body'],
        exists: { 
            errorMessage: 'job is required'
        },
        notEmpty: {
            errorMessage: 'job cannot be emtpy'
        },
        isMongoId: {
            errorMessage: 'job should be a valid'
        },
        custom: {
            options: async function(value, { req }){
                const application = await Application.findOne({ job: value, candidate: req.user.id })
                if(application) {
                    throw new Error('You have already applied for this job')
                }
                return true 
            }
        }
    }
}

applicationEditValidations={
    status:{
        in: ['body'],
        exists: { 
            errorMessage: 'status is required'
        },
        notEmpty: {
            errorMessage: 'status cannot be emtpy'
        },
        isIn:{
            options:[['accepted','under-review','rejected']],
            errorMessage:'status should be either one of them like accepted,under-review,rejected'

        },
        trim:true
    }
}



module.exports = {
    applicationValidationSchema,
    applicationEditValidations
}