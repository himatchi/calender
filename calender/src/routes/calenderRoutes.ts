import Express from 'express';
import calenderController from '../controllers/calenderController';

const router = Express.Router();

router.get("/", calenderController.index, calenderController.indexView);
// router.get("/", calenderController.indexView);

export default router;