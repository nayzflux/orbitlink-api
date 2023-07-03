import {Router} from 'express';
import {authenticate} from "../middlewares/authMiddleware";
import {
    canDeleteUser,
    canFindAllUsers,
    canFindUser, canUpdateUser,
    canUpdateUserPassword, canUpdateUserRole
} from "../middlewares/permissions/permissionMiddleware";
import {deleteUser, findAllUsers, findUser, updateUser} from "../controllers/userController";
import {validateUpdateUserInput} from "../middlewares/validations/validateUserInput";
import {resolveUser} from "../middlewares/userMiddleware";

const router = Router();

// FIND ALL
router.get('/', authenticate, canFindAllUsers, findAllUsers);

// FIND ONE
router.get('/:_id', authenticate, canFindUser, resolveUser, findUser);

// UPDATE
router.patch('/:_id', authenticate, validateUpdateUserInput, canUpdateUser, canUpdateUserRole, canUpdateUserPassword, resolveUser, updateUser)

// DELETE
router.delete('/:_id', authenticate, canDeleteUser, resolveUser, deleteUser)

export default router;