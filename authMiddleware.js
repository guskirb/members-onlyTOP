module.exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
}

module.exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/');
    } else {
        next()
    }
}

module.exports.isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.admin) {
        next();
    } else {
        res.redirect('/');
    }
}