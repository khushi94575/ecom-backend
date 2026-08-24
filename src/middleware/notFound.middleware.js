const apiError=require("../utils/apiError")

export const notFound=(req,res,next)=>{
next(apiError(404,`route not found ${req.url} ${req.originalUrl}`))
};
module.exports=notFound;