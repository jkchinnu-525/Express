const { Jwt_secret } = require("../config");
const jwt = require("jsonwebtoken");
function userMiddleware(req, res, next) {
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    const decode = jwt.verify(jwtToken,Jwt_secret);
    if(decode.username) {
        req.username = decode.username;
        next();
    }else {
        res.status(403).json({
            msg : "Admin authentication failed"
        })
    }
}

module.exports = userMiddleware;