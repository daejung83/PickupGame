export default function(route, passport) {
    route.post(
        passport.authenticate('local-signin'),
        (req, res) => {
            res.status(200).json({
                user: req.user
            });
        }
    );
}