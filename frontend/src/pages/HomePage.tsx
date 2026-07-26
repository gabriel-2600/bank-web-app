import { useState, useEffect } from "react";
import DisplayAccounts from "../components/HomePage/DisplayAccounts";
import { getAllBankAccountsApi } from "../api/Account/accountApi";
import type { AccountInterface } from "../types/AccountInterface";

function HomePage() {
  const [accounts, setAccounts] = useState<AccountInterface[]>([]);

  useEffect(() => {
    async function returnAllBankAccounts() {
      const allAccounts = await getAllBankAccountsApi();
      setAccounts(allAccounts);
    }

    returnAllBankAccounts();
  }, []);
  return (
    <>
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <section className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm sm:p-8">
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-black sm:text-3xl">
            Choose an account
          </h1>
          <p className="mt-2 text-sm text-black/60 sm:text-base">
            Select one of your bank accounts to view details.
          </p>
        </section>

        <DisplayAccounts accounts={accounts} />
      </main>
    </>
  );
}

export default HomePage;
