import Express from 'express'
import homeController from '../controllers/homeController'

const router = Express.Router()

router.get('/', homeController.index, homeController.redirectView);

export default router;