const Application = require('../model/application-model')
const Candidate=require('../model/candidate-model')
const { validationResult } = require('express-validator')
const _ = require('lodash')
const applicationsCltr = {}

applicationsCltr.apply = async (req, res) => {
    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }
    
    try { 
        const body = _.pick(req.body, ['job'])
        const application = new Application(body)
        application.candidate = req.user.id 
        await application.save()
        res.json(application)
    } catch(err) {
        console.log(err) 
        res.status(500).json({error: 'something went wrong'})
    }
}

applicationsCltr.check = async (req, res) => {
    const jobId = req.params.jobId 
    try { 
        console.log('check')
        console.log(req.user.id)
        const application = await Application.findOne({ job: jobId, candidate: req.user.id })
        if(!application) {
            console.log('empty')
            return res.json({})
        }
        console.log(application.data)
        res.json(application)

    } catch(err) {
        console.log(err) 
        res.json(err) 
    }
}

applicationsCltr.candidate=async(req,res)=>{
   try{ 
         const id=req.params.id
         const app=await Application.findById(id)
         if(!app){
            return res.json({})
         }
         const can=await Candidate.findOne({userId:app.candidate})
         res.json(can)
        
   }catch(err){
     res.status(500).json({errors:'somthing went wrong'})
   }
}


module.exports = applicationsCltr