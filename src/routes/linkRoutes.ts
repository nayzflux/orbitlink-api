import {Router} from 'express';
import {createLink, deleteLink, findAllLinks, findLink, updateLink} from "../controllers/linkController";
import {resolveLink} from "../middlewares/linkMiddleware";
import {authenticate} from "../middlewares/authMiddleware";
import {
    validateCreateLinkInput,
    validateFindLinkInput,
    validateUpdateLinkInput
} from "../middlewares/validations/validateLinkInput";
import {canReadLink} from "../middlewares/permissions/permissionMiddleware";

const router = Router();

router.post('/', validateCreateLinkInput, authenticate, createLink);

router.get('/:query', validateFindLinkInput, authenticate, resolveLink, canReadLink, findLink);
router.get('/', authenticate, findAllLinks);

router.patch('/:query', validateFindLinkInput, validateUpdateLinkInput, authenticate, resolveLink, canReadLink, updateLink)

router.delete('/:query', validateFindLinkInput, authenticate, resolveLink, canReadLink, deleteLink)

export default router;