import { prisma } from "@/lib/prisma";
import { z } from "zod";

const userRegistrationSchema = z
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

type UserParams = z.infer<typeof userRegistrationSchema>;

type UserRegistrationData = Pick<
  z.infer<typeof userRegistrationSchema>,
  "email" | "username" | "password"
>;

class RegistrationsController {
  /**
   * @user = User.new(registration_params)
   * if @user.save
   *   login @user
   *   redirect_to root_path
   * else
   *   render :new, status: unprocessable_entity
   * end
   */
  /**
   * registration_params
   *   params.require(:user).permit(:email, :password, :password_confirmation)
   */

  async create(data: UserParams) {
    const validateUserRegistration = (data: unknown) => {
      return userRegistrationSchema.parse(data);
    };

    const { email, password, username } = validateUserRegistration(
      data
    ) as UserRegistrationData;

    await prisma.user.create({
      data: {
        email,
        password,
        username,
      },
    });
  }
}

export { RegistrationsController };
