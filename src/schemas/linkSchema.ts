import {z} from 'zod';
import {validateSafeInput} from "../utils/utils";

/**
 * Schema for Creating Link
 */

export const createLinkSchema = z.object({
    shortURL: z.string().nonempty().min(2).max(10).refine(validateSafeInput),
    destinationURL: z.string().nonempty().url('destinationURL must be a valid url').refine(validateSafeInput),
    password: z.string().optional().refine(validateSafeInput),
    expirationDate: z.string().optional().refine(validateSafeInput),
    releaseDate: z.string().optional().refine(validateSafeInput),
    passwordProtectionEnabled: z.boolean().optional(),
    expirationDateEnabled: z.boolean().optional(),
    releaseDateEnabled: z.boolean().optional(),
});

export type CreateLinkData = z.infer<typeof createLinkSchema>;

/**
 * Schema for Updating Link
 */

export const updateLinkSchema = z.object({
    shortURL: z.string().nonempty().min(2).max(10).optional().refine(validateSafeInput),
    destinationURL: z.string().nonempty().url('destinationURL must be a valid url').optional().refine(validateSafeInput),
    password: z.string().optional().refine(validateSafeInput),
    expirationDate: z.string().optional().refine(validateSafeInput),
    releaseDate: z.string().optional().refine(validateSafeInput),
    passwordProtectionEnabled: z.boolean().optional(),
    expirationDateEnabled: z.boolean().optional(),
    releaseDateEnabled: z.boolean().optional(),
});

export type UpdateLinkData = z.infer<typeof updateLinkSchema>;

/**
 * Schema for Find Link
 */

export const findLinkSchema = z.object({
    query: z.string().refine(validateSafeInput)
});

export type FindLinkData = z.infer<typeof findLinkSchema>;
