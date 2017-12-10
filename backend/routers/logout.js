export default function (route, passport) {
    // POST /api/post
    // logout
    route.post((req, res) => {
        req.logOut();
        res.status(200).json({
            message: "Logged out"
        });
    });
}