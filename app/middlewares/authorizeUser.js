const authorizeUser=(permissions)=>{

    return (req,res,next)=>{
        if(permissions.includes(req.user.role)){
        next()
        }
        else{
            res.status(403).json('unauthorized user')
        }
    }

}

module.exports=authorizeUser