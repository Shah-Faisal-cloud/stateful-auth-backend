import z from 'zod';

export const nameSchema = z.string().trim().min(3).max(20);

export const emailSchema = z.string().trim().max(254).toLowerCase().pipe(z.email());

export const passwordSchema = z.string().min(1).max(64);

export const extendedPasswordSchema = passwordSchema.min(15).regex(/^[\x20-\x7E]+$/);

export const otpSchema = z.string().length(6);
