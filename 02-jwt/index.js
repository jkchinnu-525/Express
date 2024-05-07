const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';
const zod = require("zod");

const emailschema = zod.string().email();
const passwordschema = zod.string().min(6); 


function signJwt(username, password) {
    const usernameresponse = emailschema.safeParse(username);
    const passwordResponse = passwordschema.safeParse(password);
   if (!usernameresponse.success || !passwordResponse.success) {
        return null;
   } 
   const token = jwt.sign({
        username
   },jwtPassword);

   return token;
}


function verifyJwt(token) {
    let ans = true;
    try {
        jwt.verify(token,jwtPassword);
    }catch(e) {
        ans = false;
    }
    return ans;
}

function decodeJwt(token) {
    const decode = jwt.decode(token);
    if(decode) {
        return true;
    } else {
        return false;
    }
}


module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};
