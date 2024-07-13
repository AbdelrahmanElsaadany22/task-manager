import { Router } from "express";
import { validate } from "../../middlewares/validation.js";
import { signinSchema, signupSchema } from "./auth.validate.js";
import { signin, signup } from "./auth.controller.js";
import { assertUniqueEmail } from "./auth.middleware.js";


const authRouter=Router()


authRouter.post('/signup',validate(signupSchema),assertUniqueEmail,signup)
authRouter.post('/signin',validate(signinSchema),signin)

export default authRouter
