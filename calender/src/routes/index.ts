import Express from "express";
import homeRoutes from "./homeRoutes";
import calenderRoutes from "./calenderRoutes";

const router = Express.Router();

router.use('/', homeRoutes);
router.use('/calender', calenderRoutes);

export default router;