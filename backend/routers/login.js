export default function(route, passport) {
    route.post(
        passport.authenticate('local-signin'),
        (req, res) => {
            console.log(req.isAuthenticated());
            res.status(200).json({
                user: req.user.email,
                userData: req.user,
                
            });
        }
    );
}