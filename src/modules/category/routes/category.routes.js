import { Router } from "express";
import { authenticate, authorize } from "../../auth/auth.middleware.js";
import { addCategory, deleteCategory, getCategories, updateCategory } from "../controller/category.controller.js";
import { validate } from "../../../middlewares/validation.js";
import { addCategorySchema, deleteCategorySchema, updateCategorySchema } from "../validations/category.validate.js";
const categoryRouter=Router()

categoryRouter.route('/')
.post(authenticate,authorize('user'),validate(addCategorySchema),addCategory)
.get(authenticate,authorize('user'),getCategories)
categoryRouter.route('/:id')
.delete(authenticate,authorize('user'),validate(deleteCategorySchema),deleteCategory)
.put(authenticate,authorize('user'),validate(updateCategorySchema),updateCategory)
export default categoryRouter