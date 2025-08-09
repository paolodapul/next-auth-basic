import { RegistrationsController } from "./controller";

export default async function RegistrationPage() {
  // This works!
  const registrationController = new RegistrationsController();
  await registrationController.create({
    email: "test2@example.com",
    username: "admin2",
    password: "321321321",
    passwordConfirmation: "321321321",
  });
  return <>Registration page!</>;
}
