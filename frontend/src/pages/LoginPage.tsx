import LoginForm from "../components/Authentication/Login/LoginForm";
import NavBarLandingPage from "../components/LandingPage/NavBarLandingPage";

function LoginPage() {
  return (
    <>
      <NavBarLandingPage />
      <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm sm:p-8">
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-black sm:text-3xl">
            Login to your account
          </h1>
        </div>
        <LoginForm />
      </section>
    </>
  );
}

export default LoginPage;
