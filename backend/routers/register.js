export default function (route, passport) {
    // if (passport) console.log("Passport");
    route.post(
        (req, res, next) => {
            passport.authenticate('local-signup', (err, user, info) => {
                if (err) next(err);
                if (!user) {
                    return res.status(401).json(info);
                }
                req.logIn(user, err => {
                    if (err) return next(err);
                    else return res.status(201).json({user: user});
                });
            })(req, res, next);
        }
    );
}