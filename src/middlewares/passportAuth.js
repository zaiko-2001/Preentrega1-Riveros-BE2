import passport from 'passport';

export const passportAuth = (req, res, next) => {
  passport.authenticate('current', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: "Token inválido o expirado" });

    req.user = user;
    next();
  })(req, res, next);
};
