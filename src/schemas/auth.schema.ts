import z from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3)
    .max(20),

  email: z
    .string()
    .trim()
    .max(254)
    .toLowerCase()
    .pipe(z.email()),

  password: z
    .string()
    .trim()
    .min(8)
    .max(64)
    .regex(/[a-z]/)
    .regex(/[0-9]/),
});

export type SignupInput = z.infer<typeof signupSchema>;
