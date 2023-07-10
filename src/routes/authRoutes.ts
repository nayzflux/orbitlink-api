import {Router} from 'express';
import {validateSignInUserInput, validateUserInput} from "../middlewares/validations/validateUserInput";
import {logout, signIn, signUp} from "../controllers/authController";

const router = Router();

router.post('/register', validateUserInput, signUp);
router.post('/login', validateSignInUserInput, signIn);
router.post('/logout', logout);

export default router;