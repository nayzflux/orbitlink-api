import {Router} from 'express';
import {createLink, findLink} from "../controllers/linkController";
import {resolveLink} from "../middlewares/linkMiddleware";
import {authenticate} from "../middlewares/authMiddleware";
import {validateCreateLinkInput, validateFindLinkInput} from "../middlewares/validations/validateLinkInput";

const router = Router();

router.post('/', validateCreateLinkInput, authenticate, createLink);
router.get('/:query', validateFindLinkInput, authenticate, resolveLink, findLink);

export default router;