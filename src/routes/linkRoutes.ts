import {Router} from 'express';
import {createLink, deleteLink, findAllLinks, findLink, updateLink} from "../controllers/linkController";
import {resolveLink} from "../middlewares/linkMiddleware";
import {authenticate} from "../middlewares/authMiddleware";
import {
    validateCreateLinkInput,
    validateFindLinkInput,
    validateUpdateLinkInput
} from "../middlewares/validations/validateLinkInput";
import { isLinkOwnerOrAdmin} from "../middlewares/permissions/permissionMiddleware";

const router = Router();

router.post('/', validateCreateLinkInput, authenticate, createLink);

router.get('/:query', validateFindLinkInput, authenticate, resolveLink, isLinkOwnerOrAdmin, findLink);
router.get('/', authenticate, findAllLinks);

router.patch('/:query', validateFindLinkInput, validateUpdateLinkInput, authenticate, resolveLink, isLinkOwnerOrAdmin, updateLink)

router.delete('/:query', validateFindLinkInput, authenticate, resolveLink, isLinkOwnerOrAdmin, deleteLink)

export default router;