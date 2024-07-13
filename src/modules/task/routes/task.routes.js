import { Router } from "express";
import { authenticate, authorize } from "../../auth/auth.middleware.js";
import { addTask, deleteTask, getTasks, updateTask } from "../controller/task.controller.js";
import { addTaskSchema, deleteTaskSchema, updateTaskSchema } from "../validations/task.validations.js";
import { validate } from "../../../middlewares/validation.js";
const taskRouter=Router()

taskRouter.route('/')
    .post(authenticate, authorize('user'),validate(addTaskSchema),addTask)
    .get(authenticate, authorize('user'), getTasks);


taskRouter.route('/:id')
    .put(authenticate, authorize('user'),validate(updateTaskSchema),updateTask)
    .delete(authenticate, authorize('user'),validate(deleteTaskSchema), deleteTask)

export default taskRouter