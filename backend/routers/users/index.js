import home from './home'
import id from './id'
import {Router} from 'express'

const router = Router();

home(router.route('/'));
id(router.route('/:id'));

export default router;