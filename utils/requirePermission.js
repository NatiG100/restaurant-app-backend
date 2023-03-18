function requirePermission(permission=""){
    return (req,res,next)=>{
        if(permission==="" && req.session?.user){
            next();
        }else if(!req.session?.user){
            res.status(403).json({message:"you are UNAUTHORIZED to perfor the requested task"})
        }else{
            if(req.session?.user.previlages.includes(permission)){
                next();
            }else{
                res.status(403).json({message:"UNAUTHORIZED!"});
            }
        }
    }
};

module.exports = requirePermission;