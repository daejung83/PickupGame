import users from './users'
import home from './home'
import login from './login'
import {Router} from 'express'

const router = Router();

router.use('/users', users);

home(router.route('/'));
login(router.route('/login'));

export default router;