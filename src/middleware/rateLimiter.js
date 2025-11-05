import ratelimit from "../config/upstash.js";

const rateLimiter = async (req,res, next) =>{
    try{
        const result = await ratelimit.limit("my-rate-limit");
        if(!result.success) {
            return res.status(429).json({
                message: "Too many requests, please try again later",
            });
        }
        next();

    } catch(error){
        console.log("Rate limit error", error);


        //incase of error allow the request to proceed
        next();
    }
};

export default rateLimiter;