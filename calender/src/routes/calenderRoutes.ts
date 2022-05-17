import Express from 'express';
import calenderController from '../controllers/calenderController';

const router = Express.Router();

router.get("/", calenderController.index, calenderController.indexView);
// router.get("/", calenderController.indexView);
router.post("/add", calenderController.add);
router.post("/create", calenderController.create);

export default router;