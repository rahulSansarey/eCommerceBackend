export const catchAsynError= (theFuntion)=>{
    return (req,res,next)=>{
        Promise.resolve(theFuntion(req,res,next)).catch(next)
    }
}