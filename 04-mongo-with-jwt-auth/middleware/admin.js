// Middleware for handling auth
const jwt = require("jsonwebtoken");
const { Jwt_secret } = require("../config");
function adminMiddleware(req, res, next) {
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    const decode = jwt.verify(jwtToken,Jwt_secret)
    if(decode.username) {
        next();
    }else {
        res.status(403).json({
            msg : "Admin authentication failed"
        })
    }
}

module.exports = adminMiddleware;