import Group from "../../schemas/Group";
import isLoggedIn from "../../utils/isLoggedIn";
import User from "../../schemas/User";

// api/groups
export default function(route) {
    // GET get all groups
    // query params: (see https://docs.mongodb.com/manual/reference/method/db.collection.find/#db.collection.find)
    // where: condition for filtering, default: all objects
    // select: include or exclude a set of fields
    // skip
    // limit
    // sort
    route.get(isLoggedIn, async (req, res) => {
        const where = req.query.where ? JSON.parse(req.query.where) : {};
        const select = req.query.select ? JSON.parse(req.query.select) : undefined;
        const options = {};
        if (req.query.sort) options.sort = JSON.parse(req.query.sort);
        if (req.query.skip) options.skip = parseInt(req.query.skip);
        if (req.query.limit) options.limit = parseInt(req.query.limit);

        const groups = await Group.find(where, select, options).exec();
        res.status(200).json(groups);
    });

    // POST create a new group
    // query params:
    // name, sport, lon, lat, maxSize, start, end
    route.post(isLoggedIn, async (req, res) => {
        const name = req.query.name;
        const sport = req.query.sport;
        const lon = parseFloat(req.query.lon);
        const lat = parseFloat(req.query.lat);
        const maxSize = parseInt(req.query.maxSize);
        const start = Date.parse(req.query.start);
        const end = Date.parse(req.query.end);

        const group = await req.user.createGroup(name, sport, lon, lat, maxSize, start, end);
        res.status(201).json(group)
    });
};