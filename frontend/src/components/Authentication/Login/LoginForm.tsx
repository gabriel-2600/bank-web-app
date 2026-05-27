import { useForm, type SubmitHandler } from "react-hook-form";
import { errorToast, successfulToast } from "../../../util/toast-notifcation";
import { performLogin } from "../../../api/Login/performLogin";

interface LoginFormInterface {
  username: string;
  password: string;
}

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInterface>();

  const onSubmit: SubmitHandler<LoginFormInterface> = async (data) => {
    if (!data.username || !data.password) {
      errorToast("Fields cannot be empty!");
      return;
    }

    const loginData = {
      username: data.username,
      password: data.password,
    };

    try {
      await performLogin(loginData);

      successfulToast("Successful Login");
    } catch (error) {
      errorToast(error instanceof Error ? error.message : "Login Failed");
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
            htmlFor="user-name"
            className="text-sm font-medium tracking-tight text-black"
          >
            Username
          </label>
          <input
            id="user-name"
            {...register("username", {
              required: "Username is required",
            })}
            className="w-full rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-sm text-black outline-none transition-colors placeholder:text-black/40 focus:border-[#8494FF]"
            placeholder="Enter your username"
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
            {...register("password", { required: "Password is required" })}
            className="w-full rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-sm text-black outline-none transition-colors placeholder:text-black/40 focus:border-[#8494FF]"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-xs font-medium text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="mt-5 flex w-full items-center justify-center rounded-full bg-[#8494FF] px-5 py-2.5 text-sm font-semibold text-white transition-[filter] hover:brightness-105 sm:w-auto"
      >
        Login
      </button>
    </form>
  );
}

export default LoginForm;
