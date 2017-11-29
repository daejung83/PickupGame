import isLoggedIn from "./isLoggedIn";

export default function (route) {
    route.get(isLoggedIn, (req, res) => {
        console.log(req.isAuthenticated());
        res.status(200).json({ user: req.user, message: "Welcome!"});
    })
}