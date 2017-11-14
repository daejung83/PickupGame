import users from './users'
import home from './home'
import {Router} from 'express'

const router = Router()

router.use('/users', users)

home(router.route('/'));

export default router;