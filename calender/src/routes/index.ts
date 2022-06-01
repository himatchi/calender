/*!
 * Copyright (c) 2022 himatchi
 *
 * Released under the MIT license.
 * see https://opensource.org/licenses/MIT
 */
import Express from "express";
import homeRoutes from "./homeRoutes";
import calenderRoutes from "./calenderRoutes";
import userRoutes from "./userRoutes";

const router = Express.Router();

router.use('/', homeRoutes);
router.use('/calender', calenderRoutes);
router.use('/user', userRoutes);

export default router;