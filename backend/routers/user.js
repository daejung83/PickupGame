import isLoggedIn from "../utils/isLoggedIn";

export default function (route) {

    // GET /api/user
    // return an json object with user being null if user is not logged in, otherwise return the object with the user
    route.get(isLoggedIn, (req, res) => {
        if (req.isAuthenticated()) return res.status(200).json({ user: req.user, message: "Welcome!"});
        else return res.status(200).json({user: null, message: "You are not logged in."});
    });
}