export default function (route, passport) {
    // if (passport) console.log("Passport");
    route.post(
        passport.authenticate('local-signup'),
        (req, res) => {
            res.status(201).json({user: req.user.email});
        }
    );
}