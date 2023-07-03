import {Router} from 'express';
import {validateSignInUserInput, validateUserInput} from "../middlewares/validations/validateUserInput";
import {signIn, signUp} from "../controllers/authController";

const router = Router();

router.post('/register', validateUserInput, signUp);
router.post('/login', validateSignInUserInput, signIn);

export default router;