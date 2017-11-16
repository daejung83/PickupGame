export default function(route) {
    route.get((req, res) => {
        res.json({
            name: req.params.id
        });
    });
}