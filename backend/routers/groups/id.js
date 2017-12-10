import Group from "../../schemas/Group";
import isLoggedIn from "../../utils/isLoggedIn";
import User from "../../schemas/User";

export default function(route) {

    // GET /api/groups/:id
    // get all info about a group
    route.get(isLoggedIn, async (req, res) => {
        const group = await Group.findById(req.params.id).exec();
        if (group) res.json(group);
        else res.status(404).json({message: "Group ID not found"})
    });

    // DELETE /api/group/:id
    // query params: users (optional)
    // delete a group if users is available, otherwise remove user in users from this group
    route.delete(isLoggedIn, async (req, res) => {
        const group = await Group.findById(req.params.id).exec();
        if (group.host !== req.user._id) return res.status(401).json({message: "Illegal Access"});
        else if (req.params.users) {
            const userIDs = JSON.parse(req.params.users);
            await User.update({ _id: { $in: userIDs } }, { $pull: { groups: group._id} }).exec();
            await group.update({ $pullAll: userIDs });
            return res.status(200).json({message: "Users removed", data: group});
        }
        else {
            await User.update({ _id: {$in: group.users} }, { $pull: { groups: group._id } }).exec();
            await group.remove().exec();
            return res.status(200).json({message: "Group removed", data: group});
        }
    });

    // PUT /api/group/:id
    // update a group
    // require body, update
    // route.put(isLoggedIn, async (req, res) => {
    //     const group = await Group.findById(req.params.id).exec();
    //     if (group.host !== req.user._id) return res.status(401).json({message: "Illegal Access"});
    //     else {
    //         if (!req.body) res.status(400).json({message: "Empty body"});
    //
    //     }
    // });
}