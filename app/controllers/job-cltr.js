const Job=require('../model/jobModel')
const Application=require('../model/application-model')
const {validationResult}=require('express-validator')
const jobCltr={}

jobCltr.list=async(req,res)=>{
  try { 
    const job=await Job.find()
    res.json(job)
    }
    catch(err){
    res.status(500).json({errors:'somthing went wrong'})
   }
}

jobCltr.my=async(req,res)=>{
    try{
        const job=await Job.find({recruiter:req.user.id})
        res.json(job)
    }catch(err){
        res.status(500).json({errors:'somthing went wrong'})

    }
}

jobCltr.application=async(req,res)=>{
   try{ const id=req.params.id
    const job=await Job.findOne({_id:id,recruiter:req.user.id})
    if(!job){
        return res.status(404).json('record not found')
   }
   const application=await Application.find({job:job._id}).populate('candidate')
   res.json(application)
 }catch(err){
    res.status(500).json({errors:'somthing went wrong'})
 }
}


jobCltr.singleApplication = async (req, res) =>  {
    const id = req.params.id 
    const appId = req.params.appId 
    const job = await Job.findOne({ _id: id, recruiter: req.user.id })
    if(!job) {
        return res.status(404).json({ error: 'record not found'})
    }
    const application = await Application.findOne({ _id: appId, job: job._id })
    res.json(application) 
}


jobCltr.applicationUpdate=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const id=req.params.id
    const appId=req.params.appId
    const body=req.body
    const job=await Job.findOne({_id:id,recruiter:req.user.id})
         if(!job){
            res.status(404).json({errors:'record not found'})
        }
        const application=await Application.findOneAndUpdate({_id:appId,job:id},body,{new:true})
        res.json(application) 
}


jobCltr.create= async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
        
    }
    try{
        const body=req.body
        const job=new Job(body)
        job.recruiter=req.user.id
        await job.save()
        res.status(201).json(job)
    }catch(err){
        res.status(500).json(err.message)
    }
}


jobCltr.show = async (req, res) => {
    const id = req.params.id 
    try {
        const job = await Job.findById(id)
        res.json(job)
    } catch(err) {
        console.log(err) 
        res.status(500).json({ error: 'something went wrong'})
    }
}  

jobCltr.update= async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const id = req.params.id 
    const body = req.body 

    const job = await Job.findOneAndUpdate({ recruiter: req.user.id, _id: id }, body, { new: true })
    if(!job) {
        return res.status(404).json({ error: 'record not found'})
    }
    res.json(job) 
}

jobCltr.delete= async (req, res) => {
    const id = req.params.id 
    const job = await Job.findOneAndDelete({ recruiter: req.user.id, _id: id })
    if(!job) {
        return res.status(404).json({ error: 'record not found'})
    }
    res.json(job) 
}
module.exports=jobCltr