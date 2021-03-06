import Group from "../../schemas/Group";
import isLoggedIn from "../../utils/isLoggedIn";
import User from "../../schemas/User";
import mongoose, { Schema } from 'mongoose';

export default function(route) {

    // GET /api/groups/:id
    // get all info about a group
    route.get(isLoggedIn, async (req, res) => {
        const group = await Group.findById(req.params.id).exec();
        if (group) res.json(group);
        else res.status(404).json({message: "Group ID not found"})
    });

    // DELETE /api/group/:id
    // body.users (optional)
    // delete a group if users is not available, otherwise remove user in users from this group
    route.delete(isLoggedIn, async (req, res) => {
        let group = await Group.findById(req.params.id).exec();
        if (!group) return res.status(404).json({message: "Not Found"});
        if (!group.host.equals(req.user._id)) return res.status(401).json({message: "Illegal Access"});
        else if (req.body && req.body.users) {
            const userIDs = [... new Set(JSON.parse(req.body.users))];
            await User.update({ _id: { $in: userIDs } }, { $pull: { groups: group._id} }).exec();
            group = await group.update({ $pullAll: { users: userIDs } });
            group = await group.update({ $set: { currentSize: group.users.length } });
            if (userIDs.some(id => req.user._id.equals(id))) {
                req.logIn(req.user, (err) => {})
            }
            return res.status(200).json({message: "Users removed", data: group});
        }
        else {
            await User.update({ _id: {$in: group.users.concat(group.host)} }, { $pull: { groups: group._id } }).exec();
            await group.remove();
            if (group.users.some(id => req.user._id.equals(id))) {
                req.logIn(req.user, (err) => {})
            }
            return res.status(200).json({message: "Group removed", data: group});
        }
    });

    // PUT /api/group/:id
    // update a group
    // require body
    // acceptable params in body:
    // body.name, body.sport, body.longitude, body.latitude, body.maxSize, body.startTime, body.endTime
    route.put(isLoggedIn, async (req, res) => {
        const group = await Group.findById(req.params.id).exec();
        if (!group) return res.status(404).json({message: "Not Found"});
        if (!group.host.equals(req.user._id)) return res.status(401).json({message: "Illegal Access"});
        else {
            if (!req.body) return res.status(400).json({message: "Empty body"});
            if (req.body.name) group.name = req.body.name;
            if (req.body.sport) group.sport = req.body.sport;
            if (req.body.longitude) group.longitude = req.body.longitude;
            if (req.body.latitude) group.latitude = req.body.latitude;
            if (req.body.maxSize) group.maxSize = req.body.maxSize;
            if (req.body.startTime) group.startTime = req.body.startTime;
            if (req.body.endTime) group.endTime = req.body.endTime;
        }
        await group.save();
        return res.status(200).json({data: group});
    });

    // POST /api/group/:id
    // join or exit a group
    route.post(isLoggedIn, async (req, res) => {
        const group = await Group.findById(req.params.id).exec();
        if (!group) return res.status(404).json({message: "Not Found"});
        if (group.host.equals(req.user._id)) return res.status(400).json({message: "Cannot join your own group"});
        let msg, sizeDiff;
        if (!group.users.some(id => id.equals(req.user._id))) {
            await User.update({ _id: req.user._id }, { $push: { groups: group._id } });
            await group.update({$push: {users: req.user._id}});
            msg = "joined";
            sizeDiff = 1;
        } else {
            await User.update({ _id: req.user._id }, { $pull: { groups: group._id } });
            await group.update({$pull: {users: req.user._id}});
            msg = "left";
            sizeDiff = -1
        }
        await group.update({$inc: {currentSize: sizeDiff}});
        req.logIn(req.user, (err) => {});
        return res.status(201).json({message: msg});
    });
}