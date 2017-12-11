import home from "./home";
import id from  "./id"

export default function (router) {
    home(router.route('/'));
    id(router.route('/:id'));

    return router;
}