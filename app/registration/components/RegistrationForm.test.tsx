import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { RegistrationForm } from "./RegistrationForm";

test("Page", () => {
  render(<RegistrationForm />);
  expect(screen.getAllByText(/Create your account/i)).toBeDefined();
});
