"use server";

import { z } from "zod";
import { RegistrationsController, userRegistrationSchema } from "./controller";
import bcrypt from "bcrypt";

type FormValues = z.infer<typeof userRegistrationSchema>;

export async function hashPassword(plainPassword: string) {
  const saltRounds = 12; // Cost factor - higher = more secure but slower
  try {
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
}

export async function registerUser(data: FormValues) {
  const result = userRegistrationSchema.safeParse(data);

  if (!result.success) {
    const errorMessages = result.error.issues.reduce((prev, issue) => {
      return (prev += issue.message + " ");
    }, "");

    return {
      error: errorMessages,
    };
  }

  try {
    const { email, username, password, passwordConfirmation } = result.data;

    const registrationController = new RegistrationsController();
    await registrationController.create({
      email,
      username,
      password,
      passwordConfirmation,
    });

    return { success: true };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      error: "Registration failed. Please try again.",
    };
  }
}
