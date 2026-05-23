import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import {
  successfulToast,
  errorToast,
} from "../../../util/toast-notifcation.ts";
import { performRegistration } from "../../../api/Registration/performRegistration.ts";

interface RegistrationFormInterface {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
}

function RegistrationForm() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegistrationFormInterface>();

  const password = useWatch({ control, name: "password" });
  const confirmPassword = useWatch({ control, name: "confirmPassword" });
  const isPasswordMismatch = password !== confirmPassword;

  const onSubmit: SubmitHandler<RegistrationFormInterface> = async (data) => {
    if (!data.fullName || !data.username || !data.password) {
      errorToast("Fields cannot be empty!");
      return;
    }

    if (isPasswordMismatch) {
      errorToast("Password Do Not Match!");
      return;
    }

    const registrationData = {
      fullName: data.fullName,
      username: data.username,
      password: data.password,
    };

    try {
      const result = await performRegistration(registrationData);

      if (result) {
        successfulToast("Registered Successfully!");
        reset();
      } else {
        errorToast("Registration Failed");
      }
    } catch (err) {
      errorToast(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-5 rounded-2xl border border-black/10 bg-white p-5 shadow-sm sm:mt-6 sm:p-6"
    >
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label
            htmlFor="full-name"
            className="text-sm font-medium tracking-tight text-black"
          >
            Full Name
          </label>

          <input
            id="full-name"
            {...register("fullName", { required: "Full Name is required" })}
            className="w-full rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-sm text-black outline-none transition-colors placeholder:text-black/40 focus:border-[#8494FF]"
            placeholder="Enter your full name"
          />
          {errors.fullName && (
            <p className="text-xs font-medium text-red-500">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="user-name"
            className="text-sm font-medium tracking-tight text-black"
          >
            Username
          </label>

          <input
            id="user-name"
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 4,
                message: "Minimum 4 characters required",
              },
            })}
            className="w-full rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-sm text-black outline-none transition-colors placeholder:text-black/40 focus:border-[#8494FF]"
            placeholder="Minimum 4 characters"
          />
          {errors.username && (
            <p className="text-xs font-medium text-red-500">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="password"
            className="text-sm font-medium tracking-tight text-black"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Minimum 8 characters",
              },
            })}
            className="w-full rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-sm text-black outline-none transition-colors placeholder:text-black/40 focus:border-[#8494FF]"
            placeholder="At least 8 characters"
          />
          {errors.password && (
            <p className="text-xs font-medium text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="confirm-password"
            className="text-sm font-medium tracking-tight text-black"
          >
            Confirm Password
          </label>

          <input
            id="confirm-password"
            type="password"
            {...register("confirmPassword", {
              required: true,
            })}
            className="w-full rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-sm text-black outline-none transition-colors placeholder:text-black/40 focus:border-[#8494FF]"
            placeholder="Re-enter your password"
          />
          {isPasswordMismatch && (
            <p className="text-xs font-medium text-red-500">
              Password does not match
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="mt-5 flex w-full items-center justify-center rounded-full bg-[#8494FF] px-5 py-2.5 text-sm font-semibold text-white transition-[filter] hover:brightness-105 sm:w-auto"
      >
        Register
      </button>
    </form>
  );
}

export default RegistrationForm;
