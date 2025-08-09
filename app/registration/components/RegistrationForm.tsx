"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRegistration } from "../hooks/useRegistration";
import { RegistrationFormProps } from "../types";
import { Form } from "@/components/ui/form";
import { RegistrationFormFields } from "./RegistrationFormFields";
import { Button } from "@/components/ui/button";

export function RegistrationForm({
  onSuccess,
  onError,
  title = "Register",
  description = "Create your account",
}: RegistrationFormProps) {
  const { form, handleSubmit, isLoading, error } = useRegistration({
    onSuccess,
    onError,
  });

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">{title}</CardTitle>
          <CardDescription className="text-center">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="text-red-500 text-sm text-center" role="alert">
              {error}
            </div>
          )}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <RegistrationFormFields control={form.control} />
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                data-testid="register-button"
              >
                {isLoading ? "Registering..." : "Register"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
