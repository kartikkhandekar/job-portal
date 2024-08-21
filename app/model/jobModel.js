const {Schema,model}=require('mongoose')
const jobSchema=new Schema({
    title:String,
    recruiter:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    description:String,
    openings:Number,
    location:[String],
    jobType:String,
    experience:{
        minExp:Number,
        maxExp:Number
    },
    dueDate:Date,
    skills:[String],
    salary:{
        minSalary:Number,
        maxSalary:Number
    }
},{timestamps:true})

const Job=model('Job',jobSchema)

module.exports=Job