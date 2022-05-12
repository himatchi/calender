import Express from 'express';
import calenderController from '../controllers/calenderController';

const router = Express.Router();

router.get("/", calenderController)

export default router;