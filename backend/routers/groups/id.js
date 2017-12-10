import Group from "../../schemas/Group";
import isLoggedIn from "../../utils/isLoggedIn";

export default function(route) {
    route.get(isLoggedIn, async (req, res) => {
        const group = await Group.findById(req.params.id).exec();
        if (group) res.json(group);
        else res.status(404).json({message: "Group ID not found"})
    });

}