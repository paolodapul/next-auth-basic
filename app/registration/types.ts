import { userRegistrationSchema } from "./controller";
import { z } from "zod";

export type RegistrationFormValues = z.infer<typeof userRegistrationSchema>;

export interface UseRegistrationProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export interface RegistrationFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  title?: string;
  description?: string;
}
