function updateLocals(req, res, next) {

    if (!req.session.user) {
        res.locals.isUserActive = false;
    } else {
        res.locals.isUserActive = true;
    } 
    next();

}

module.exports = updateLocals;