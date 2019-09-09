function isLoggedIn(req, res, next){
    if(req.user){
        next()
    }
    else(
        return false;
    )
}
module.exports = isLoggedIn;