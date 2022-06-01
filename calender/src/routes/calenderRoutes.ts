/*!
 * Copyright (c) 2022 himatchi
 *
 * Released under the MIT license.
 * see https://opensource.org/licenses/MIT
 */
import Express from 'express';
import calenderController from '../controllers/calenderController';

const router = Express.Router();

router.get("/", calenderController.index, calenderController.indexView);
// router.get("/", calenderController.indexView);
router.post("/add", calenderController.add);
router.post("/create", calenderController.create, calenderController.redirectView);
router.post("/edit", calenderController.edit);
router.post("/update", calenderController.update, calenderController.redirectView);
router.post("/delete", calenderController.delete, calenderController.redirectView);
export default router;