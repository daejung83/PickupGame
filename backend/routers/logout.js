export default function (route, passport) {
    route.post((req, res) => {
        req.logOut();
        res.status(200).json({
            message: "Logged out"
        });
    });
}