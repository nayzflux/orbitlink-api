import {z} from 'zod';
import {validateSafeInput} from "../utils/utils";

/**
 * Schema for Creating Link
 */

export const createLinkSchema = z.object({
    // Short URL
    customPath: z.string().min(3).max(10).optional().refine(validateSafeInput),
    // Long URL
    longUrl: z.string().url('longUrl must be a valid url').refine(validateSafeInput)
});

export type CreateLinkData = z.infer<typeof createLinkSchema>;

/**
 * Schema for Find Link
 */

export const findLinkSchema = z.object({
    query: z.string().refine(validateSafeInput)
});

export type FindLinkData = z.infer<typeof findLinkSchema>;
