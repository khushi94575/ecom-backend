 const apiError = (statuscode,message = 'something went wrong', errors =[])=>{
    const err = new Error (message);
    err.statuscode = statuscode;
    err.errors = errors;
    err.sucess = false;
    err.isApiError = true;
    return err ;
};
module.exports ={ apiError};