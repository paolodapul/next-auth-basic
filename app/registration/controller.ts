import { prisma } from "@/lib/prisma";
import { hashPassword } from "./actions";
import { userRegistrationSchema } from "./schema";
import { UserParams, UserRegistrationData } from "./types";

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

    const hashedPassword = await hashPassword(password);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });
  }
}

export { RegistrationsController, userRegistrationSchema };
