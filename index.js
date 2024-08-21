require('dotenv').config()
const cors=require('cors')
const express=require('express')
const {checkSchema}=require('express-validator')
const configureDB=require('./config/db')
const userValidationSchema=require('./app/validations/user-register-validation')
const userLoginValidations=require('./app/validations/user-login-validation')
const {recruiterValidationSchema,recruiterEditValidationSchema}=require('./app/validations/recruiter-validation')
const {candidateValidationSchema,candidateEditValidationSchema}=require('./app/validations/candidate-validation')
const {applicationValidationSchema,applicationEditValidations}=require('./app/validations/application-validation')
const {jobValidationSchema,jobEditValidation,idValidationSchema}=require('./app/validations/jobValidation')
const usersCltr=require('./app/controllers/users-cltr')
const jobCltr=require('./app/controllers/job-cltr')
const candidatesCltr=require('./app/controllers/candidate-cltr')
const recruiterCltr=require('./app/controllers/recruiter-cltr')
const applicationsCltr=require('./app/controllers/application-cltr')
const authenticationUser=require('./app/middlewares/authenticateUser')
const authorizeUser=require('./app/middlewares/authorizeUser')
const app=express()
app.use(express.json())
app.use(cors())
const port=3333
configureDB()

app.use((req, res, next) => {
    console.log('body', req.body, new Date()) 
    next()
})

app.post('/users/register',checkSchema(userValidationSchema),usersCltr.register)
app.post('/users/login',checkSchema(userLoginValidations),usersCltr.login)

app.get('/users/account',authenticationUser,usersCltr.account)
app.get('/users/checkemail',usersCltr.checkEmail)

app.get('/api/jobs',jobCltr.list)
app.get('/api/jobs/my',authenticationUser,authorizeUser(['recruiter']),jobCltr.my)
app.get('/api/jobs/:id', jobCltr.show)
app.get('/api/jobs/:id/applications',authenticationUser,authorizeUser(['recruiter']),jobCltr.application)
app.put('/api/jobs/:id/applications/:appId',authenticationUser,authorizeUser(['recruiter']),checkSchema(applicationEditValidations),jobCltr.applicationUpdate)
app.get('/api/jobs/:id/applications/:appId',authenticationUser,authorizeUser(['recruiter']),jobCltr.singleApplication)

app.post('/api/jobs',authenticationUser,authorizeUser(['recruiter']),checkSchema(jobValidationSchema),jobCltr.create)
app.put('/api/jobs/:id',authenticationUser,authorizeUser(['recruiter']),checkSchema(jobEditValidation),jobCltr.update)
app.delete('/api/jobs/:id',authenticationUser,authorizeUser(['recruiter']),checkSchema(idValidationSchema),jobCltr.delete)


app.get('/api/candidates/profile',authenticationUser,authorizeUser(['candidate']),candidatesCltr.show)
app.post('/api/candidates/profile',authenticationUser,authorizeUser(['candidate']),checkSchema(candidateValidationSchema),candidatesCltr.create)
app.put('/api/candidates/profile',authenticationUser,authorizeUser(['candidate']),checkSchema(candidateEditValidationSchema),candidatesCltr.update)

app.get('/api/recruiters/profile',authenticationUser,authorizeUser(['recruiter']),recruiterCltr.show)
app.post('/api/recruiters/profile',authenticationUser,authorizeUser(['recruiter']),checkSchema(recruiterValidationSchema),recruiterCltr.create)
app.put('/api/recruiters/profile',authenticationUser,authorizeUser(['recruiter']),checkSchema(recruiterEditValidationSchema),recruiterCltr.update)

app.get('/api/applications/check/:jobId', authenticationUser, authorizeUser(['candidate','recruiter']), applicationsCltr.check)
app.post('/api/applications', authenticationUser, authorizeUser(['candidate']), checkSchema(applicationValidationSchema), applicationsCltr.apply)
app.get('/api/candidate/:id',authenticationUser,authorizeUser(['candidate','recruiter']),applicationsCltr.candidate)

app.listen(port,()=>{
    console.log(`connected to server on port ${port}`)
})
