import CreateBankAccountForm from "../components/CreateAccount/CreateBankAccountForm";

function CreateAccountPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm sm:p-8">
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-black sm:text-3xl">
          Create a bank account
        </h1>
      </div>
      <CreateBankAccountForm />
    </section>
  );
}

export default CreateAccountPage;
