function requirePermission(permission=""){
    return (req,res,next)=>{
        if(permission===""){

        }else if(!req.session?.user){
            res.status(403).json({message:"you are UNAUTHORIZED to perfor the requested task"})
        }else{
            if(req.session?.user.previlages.includes(permission)){
                next();
            }else{
                res.status(403).json({message:"you are UNAUTHORIZED to perform the requested task"});
            }
        }
    }
};

module.exports = requirePermission;