const jwt = require('jsonwebtoken');
const key = "projectby$hr3y"
function setUser(user){
    try {
        return jwt.sign({
            
        },key);
    } catch (error) {
    
    }
}

function getUser(token){
    return jwt.verify(token,key);
}

module.exports = {
    setUser,
    getUser,
}