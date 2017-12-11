
import isLoggedIn from "../../utils/isLoggedIn";
import User from "../../schemas/User";

export default function (route) {
    route.get(isLoggedIn, async (req, res) => {
        const where = {};
        const select = "name rating numberRated preferredSport";
        const options = {};
        if (req.query.skip) options.skip = parseInt(req.query.skip);
        if (req.query.limit) options.limit = parseInt(req.query.limit);

        const users = await User.find(where, select, options).exec();
        res.status(200).json(users);
    })
}