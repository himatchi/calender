/*!
 * Copyright (c) 2022 himatchi
 *
 * Released under the MIT license.
 * see https://opensource.org/licenses/MIT
 */
import Express from 'express'
import userController from '../controllers/userController';

const router = Express.Router()

router.get('/', userController.index);
router.get('/signup', userController.signup);
router.post('/create', userController.create, userController.redirectView);
router.post('/', userController.login, userController.redirectView);
router.get('/logout', userController.logout);

export default router;