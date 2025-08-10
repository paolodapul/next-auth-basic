import { z } from "zod";

export const userRegistrationSchema = z
  .object({
    email: z.email("Please enter a valid email"),
    username: z.string(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
  });
