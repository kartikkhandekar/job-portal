const {Schema,model}=require('mongoose')

const recruiterSchema=new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    companyName:String,
    email:String,
    website:String,
    address:String
})

const Recruiter=model('Recruiter',recruiterSchema)

module.exports=Recruiter