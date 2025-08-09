import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { userRegistrationSchema } from "../controller";
import { registerUser } from "../actions";
import { RegistrationFormValues, UseRegistrationProps } from "../types";

export function useRegistration({
  onSuccess,
  onError,
}: UseRegistrationProps = {}) {
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(userRegistrationSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (values: RegistrationFormValues) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await registerUser(values);

        if (response?.error) {
          setError(response.error);
          onError?.(response.error);
        } else {
          form.reset();
          onSuccess?.();
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unexpected error occurred";
        setError(errorMessage);
        onError?.(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [form, onSuccess, onError]
  );

  return {
    form,
    handleSubmit,
    isLoading,
    error,
  };
}
