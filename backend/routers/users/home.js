export default function(route) {
    route.get((req, res) => {
        res.json([
            {name: "user1"}, {name: "user2"}, {name: "user3"}
        ]);
    }); 
};