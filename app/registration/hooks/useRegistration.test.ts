import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useRegistration } from "./useRegistration";
import { useForm } from "react-hook-form";

vi.mock("react-hook-form", () => ({
  useForm: vi.fn(),
}));

describe("useRegistration", () => {
  const mockUseForm = vi.mocked(useForm);
  const mockFormMethods = {
    handleSubmit: vi.fn(),
  };

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockUseForm.mockReturnValue(mockFormMethods as any);
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useRegistration());
    const { isLoading, error } = result.current;

    expect(isLoading).toBe(false);
    expect(error).toBeFalsy();
    expect(mockUseForm).toHaveBeenCalledWith(
      expect.objectContaining({
        defaultValues: {
          email: "",
          username: "",
          password: "",
          passwordConfirmation: "",
        },
      })
    );
  });
});
