
const jobValidationSchema = {
    title: {
        in: ['body'],
        exists: {
            errorMessage: 'title is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'title cannot be empty'
        }
    },
    description: {
        in: ['body'],
        exists: {
            errorMessage: 'description is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'description cannot be empty'
        }
    },
    openings: {
        in: ['body'],
        exists: {
            errorMessage: 'openings is required'
        },
        trim: true,
        isNumeric:{
            errorMessage:'it should be in number'
        },
        notEmpty: {
            errorMessage: 'openings cannot be empty'
        }
    },
    location: {
        in: ['body'],
        exists: {
            errorMessage: 'location is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'location cannot be empty'
        }
    },
    jobType: {
        in: ['body'],
        exists: {
            errorMessage: 'jobType is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'jobType cannot be empty'
        },
        isIn: {
            options: [['wfh', 'wfo', 'hybrid']],
            errorMessage: 'should be either of wfh, wfo or hybrid'
        }
    },
    'experience.minExp': {
        exists: {
            errorMessage: 'min experience is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'min experience cannot be empty'
        },
        isNumeric: {
            options: { min: 0},
            errorMessage: 'min experience should be 0'
        }
    },
    'experience.maxExp': {
        exists: {
            errorMessage: 'max experience is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'max experience cannot be empty'
        },
        isNumeric: {
            options: { max: 70},
            errorMessage: 'max experience should be 3y'
        }
    },
    dueDate: {
        exists: {
            errorMessage: 'dueDate is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'dueDate cannot be empty'
        },
        custom: {
            options: function(value){
                if(new Date(value) < new Date()){
                    throw new Error('dueDate should be greater than todays date')
                } else {
                    return true
                }
            }
        }
    },
    skills: {
        exists: {
            errorMessage: 'skills is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'skills cannot be empty'
        },
        custom: {
            options: function(value) {
                if(!Array.isArray(value)) {
                    throw new Error('Skills should be provided')
                }
                if(value.length == 0) {
                    throw new Error('should consist of atleast one skill')
                }
                return true 
            }
        }
    },
    'salary.minSalary': {
        exists: {
            errorMessage: 'min salary is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'min salary cannot be empty'
        },
        isNumeric: {
            errorMessage: 'min salary should be a number'
        }
    },
    'salary.maxSalary': {
        exists: {
            errorMessage: 'max salary is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'max salary cannot be empty'
        },
        isNumeric: {
            errorMessage: 'should be a number'
        },
        custom: {
            options: function(value, { req }){
                if(Number(value) < Number(req.body.salary.minSalary)) {
                    throw new Error('max salary should be greater than min salary')
                }
                return true 
            }
        }
    }
}

const jobEditValidation={
    id:{
        in:['params'],
        isMongoId:{
            errorMessage:'should be valid mongo id'
        }
    },
    title: {
        in: ['body'],
        exists: {
            errorMessage: 'title is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'title cannot be empty'
        }
    },
    description: {
        in: ['body'],
        exists: {
            errorMessage: 'description is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'description cannot be empty'
        }
    },
    openings: {
        in: ['body'],
        exists: {
            errorMessage: 'openings is required'
        },
        trim: true,
        isNumeric:{
            errorMessage:'it should be in number'
        },
        notEmpty: {
            errorMessage: 'openings cannot be empty'
        }
    },
    location: {
        in: ['body'],
        exists: {
            errorMessage: 'location is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'location cannot be empty'
        }
    },
    jobType: {
        in: ['body'],
        exists: {
            errorMessage: 'jobType is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'jobType cannot be empty'
        },
        isIn: {
            options: [['wfh', 'wfo', 'hybrid']],
            errorMessage: 'should be either of wfh, wfo or hybrid'
        }
    },
    'experience.minExp': {
        exists: {
            errorMessage: 'min experience is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'min experience cannot be empty'
        },
        isNumeric: {
            options: { min: 0},
            errorMessage: 'min experience should be 0'
        }
    },
    'experience.maxExp': {
        exists: {
            errorMessage: 'max experience is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'max experience cannot be empty'
        },
        isNumeric: {
            options: { max: 70},
            errorMessage: 'max experience should be 3y'
        }
    },
    dueDate: {
        exists: {
            errorMessage: 'dueDate is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'dueDate cannot be empty'
        },
        custom: {
            options: function(value){
                if(new Date(value) < new Date()){
                    throw new Error('dueDate should be greater than todays date')
                } else {
                    return true
                }
            }
        }
    },
    skills: {
        exists: {
            errorMessage: 'skills is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'skills cannot be empty'
        },
        custom: {
            options: function(value) {
                if(!Array.isArray(value)) {
                    throw new Error('Skills should be provided')
                }
                if(value.length == 0) {
                    throw new Error('should consist of atleast one skill')
                }
                return true 
            }
        }
    },
    'salary.minSalary': {
        exists: {
            errorMessage: 'min salary is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'min salary cannot be empty'
        },
        isNumeric: {
            errorMessage: 'min salary should be a number'
        }
    },
    'salary.maxSalary': {
        exists: {
            errorMessage: 'max salary is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'max salary cannot be empty'
        },
        isNumeric: {
            errorMessage: 'should be a number'
        },
        custom: {
            options: function(value, { req }){
                if(Number(value) < Number(req.body.salary.minSalary)) {
                    throw new Error('max salary should be greater than min salary')
                }
                return true 
            }
        }
    }
}

const idValidationSchema={
    id:{
    in:['params'],
    isMongoId:{
        errorMessage:'should be valid mongo id'
    }
}
}

module.exports = {jobValidationSchema,jobEditValidation,idValidationSchema}