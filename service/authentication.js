const jwt = require('jsonwebtoken');
const key = "projectby$hr3y"
function setUser(user){
    try {
        return jwt.sign({
            studentid: user.studentid,
            password: user.password,
        },key);
    } catch (error) {
    
    }
}

function getUser(token){
    if (!token) return null;
    try {
        return jwt.verify(token,key);
    } catch (error) {
        return null;
    }

}

module.exports = {
    setUser,
    getUser,
}