import { Router, type IRouter } from "express";
import healthRouter from "./health";
import dressesRouter from "./dresses";
import reviewsRouter from "./reviews";
import contactRouter from "./contact";
import ordersRouter from "./orders";

const router: IRouter = Router();

router.use(healthRouter);
router.use(dressesRouter);
router.use(reviewsRouter);
router.use(contactRouter);
router.use(ordersRouter);

export default router;
