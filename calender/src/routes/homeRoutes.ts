/*!
 * Copyright (c) 2022 himatchi
 *
 * Released under the MIT license.
 * see https://opensource.org/licenses/MIT
 */
import Express from 'express'
import homeController from '../controllers/homeController'

const router = Express.Router()

router.get('/', homeController.index, homeController.redirectView);

export default router;