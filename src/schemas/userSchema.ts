import {z} from 'zod';
import {validateSafeInput, validateSecurePassword} from "../utils/utils";

/**
 * Schema for Sign Up
 */

const userSchema = z.object({
    // username
    username: z.string().nonempty().min(3).max(25).refine(validateSafeInput).optional(),
    // email
    email: z.string().nonempty().email().refine(validateSafeInput),
    // password
    password: z.string().nonempty().min(8).max(100).refine(validateSecurePassword),
});

export default userSchema;

export type User = z.infer<typeof userSchema>;

/**
 * Schema for Sign In
 */

export const signInUserSchema = z.object({
    // email
    email: z.string().nonempty().refine(validateSafeInput),
    // password
    password: z.string().nonempty(),
});

export type SignInUserData = z.infer<typeof signInUserSchema>;

/**
 * Schema for Update
 */

export const updateUserDataSchema = z.object({
    // username
    username: z.string().nonempty().min(3).max(25).refine(validateSafeInput).optional(),
    // email
    email: z.string().nonempty().email().refine(validateSafeInput).optional(),
    // password
    password: z.string().nonempty().min(8).max(100).refine(validateSecurePassword).optional(),
    // roles
    roles: z.array(z.string().nonempty().refine(validateSecurePassword).optional()).optional(),
    // _id
    _id: z.undefined({invalid_type_error: "You can't edit your ID"})
});

export type UpdateUserData = z.infer<typeof updateUserDataSchema>;
