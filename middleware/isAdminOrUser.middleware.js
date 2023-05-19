function isAdminOrUser(req, res, next) {
  if (req.session.user.role === "admin" || req.session.user.role === "user")
    next();
  else res.redirect("/");
}

module.exports = isAdminOrUser;
