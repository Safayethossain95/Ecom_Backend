import { TokenDecode } from "../utility/tokenUtility.js"

export default (req, res, next) => {

    const {token} = req.headers
    let decoded = TokenDecode(token)
    if(decoded === null){
        res.status(401).json({status:"fail",message:"Unauthorized"})
    }
    else{
        let email = decoded.email;
        let user_id = decoded.user_id;
        req.headers.email=email;
        req.headers.user_id=user_id;
        next()
    }

}