import isLoggedIn from "../utils/isLoggedIn";

export default function (route) {

    // GET /api/user
    // return an json object with user being null if user is not logged in, otherwise return the object with the user
    route.get(isLoggedIn, async (req, res) => {
        if (req.isAuthenticated()) return res.status(200).json({ user: req.user, message: "Welcome!"});
        else return res.status(200).json({user: null, message: "You are not logged in."});
    });

    // PUT /api/user
    route.put(isLoggedIn, async (req, res) => {
        const user = await User.findById(req.user.id).exec();

        if(req.body.name) user.name = req.body.name;
        if(req.body.email) user.email = req.body.email;
        if(req.body.preferredSport) user.preferredSport = req.body.preferredSport;
        await user.save();
        req.logIn(user, function(error) {
            if(error){
                return res.status(500).json({message: "Internal error."})
            }
        });
        return res.status(200).json({message: "User updated.", data: user});
    });

    // POST /api/user
    route.post(isLoggedIn, async (req, res) => {
        const user = await User.findById(req.params.id).exec();
        if (user._id === req.user._id) return res.status(401).json({message: "Can't rate yourself."});

    });
}