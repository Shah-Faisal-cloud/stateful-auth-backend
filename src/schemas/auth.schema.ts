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
    .min(8)
    .max(64)
    .regex(/[a-z]/)
    .regex(/[0-9]/),
});

export const loginSchema = z.object({
  email: z.string().trim().max(254).toLowerCase().pipe(z.email()),
  password: z.string().min(8).max(64)
})

export type SignupInput = z.infer<typeof signupSchema>;

export type LoginInput = z.infer<typeof loginSchema>
