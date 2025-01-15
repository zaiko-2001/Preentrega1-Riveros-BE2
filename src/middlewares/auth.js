import passport from 'passport';

export const authenticateJwt = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: 'No autenticado' });
    }
    req.user = user;
    next();
  })(req, res, next);
};
