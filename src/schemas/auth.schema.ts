import z from "zod";

export const signupSchema = z.object({
  name: z
    .string({
      error: (iss) => {
        if (iss.input === undefined) {
          return "Name is required";
        }
      },
    })
    .trim()
    .min(3, { error: "Name must be at least 3 characters" })
    .max(20, { error: "Name must be at most 20 characters" }),

  email: z
    .string({
      error: (iss) => {
        if (iss.input === undefined) {
          return "Email is required";
        }
      },
    })
    .trim()
    .toLowerCase()
    .pipe(z.email({ error: "Please enter a valid email address" })),

  password: z.string({
    error: (iss) => {
      if (iss.input === undefined) {
        return 'Password is required'
      }
    }
  })
    .trim()
    .min(8, { error: 'Password must be at least 8 characters' })
    .max(64, { error: 'Password must be at most 64 characters' })
    .regex(/[a-z]/, { error: "Password must contain a lowercase letter" })
    .regex(/[0-9]/, { error: "Password must contain a number" }),
});


export type SignupInput = z.infer<typeof signupSchema>