import isLoggedIn from "../utils/isLoggedIn";
import User from "../schemas/User";

export default function (route) {

    // GET /api/user
    // return an json object with user being null if user is not logged in, otherwise return the object with the user
    route.get(isLoggedIn, async (req, res) => {
        if (req.isAuthenticated()) {
            req.logIn(req.user, (err) => {});
            return res.status(200).json({user: req.user, message: "Welcome!"});
        }
        else return res.status(200).json({user: null, message: "You are not logged in."});
    });

    // PUT /api/user
    route.put(isLoggedIn, async (req, res) => {
        const user = await User.findById(req.user._id).exec();

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
    // We used req.body but not sure if req.query would be needed.
    route.post(isLoggedIn, async (req, res) => {
        const user = await User.findById(req.query.id).exec();
        if (user._id.equals(req.user._id)) return res.status(401).json({message: "Can't rate yourself."});
        if(req.body.rating){
            if(req.body.rating < 1 || req.body.rating > 5){
                return res.status(400).json({message: "Invalid rating."})
            }
            newNumRate = user.numberRated + 1;
            user.rating = ((user.rating * user.numberRated) + req.body.rating)/newNumRate;
            user.numberRated = newNumRate;
        }
        req.logIn(user, function(error) {
            if(error){
                return res.status(500).json({message: "Internal error."})
            }
        });
        return res.status(200).json({message: "User rated.", data: user});
    });
}