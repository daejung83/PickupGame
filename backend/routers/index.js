import users from './users'
import home from './home'
import login from './login'
import logout from './logout'
import register from './register'
import {Router} from 'express'
import user from './user'


export default function (router, passport) {
    router.use('/users', users(new Router(), passport));

    home(router.route('/'));
    login(router.route('/login'), passport);
    logout(router.route('/logout'), passport);
    register(router.route('/register'), passport);
    user(router.route('/user'));

    return router
}