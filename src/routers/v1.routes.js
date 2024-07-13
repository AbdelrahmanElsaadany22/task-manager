import { Router } from "express";
import authRouter from "../modules/auth/auth.routes.js";
import categoryRouter from "../modules/category/routes/category.routes.js";
import taskRouter from "../modules/task/routes/task.routes.js";


const router=Router()

router.use('/auth', authRouter)
router.use('/category',categoryRouter)
router.use('/task',taskRouter)
export default router