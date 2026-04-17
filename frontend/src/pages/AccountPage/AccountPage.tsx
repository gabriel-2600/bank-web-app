import { useOutletContext, useParams } from "react-router";
import type { AccountInterface } from "../../types/AccountInterface";
import TransactionButton from "../../components/Account/Transaction/TransactionButton";

type AppOutletContext = {
  accounts: AccountInterface[];
  setAccounts: React.Dispatch<React.SetStateAction<AccountInterface[]>>;
};

function AccountPage() {
  const { accounts, setAccounts } = useOutletContext<AppOutletContext>();
  const { accountId } = useParams<{ accountId: string }>();
  const account = accounts.find((a) => a.accountID === accountId);

  if (!accountId || !account) {
    throw new Response("Account not found", { status: 404 });
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <section className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8494FF]">
          Account details
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-black sm:text-3xl">
          {account.accountName}
        </h1>
        <p className="mt-3 font-mono text-xs text-black/50 sm:text-sm">
          Account ID
        </p>
        <p className="font-mono text-xs text-black/50 sm:text-sm">
          {account.accountID}
        </p>

        <div className="mt-6">
          <p className="text-xs font-medium uppercase tracking-wider text-black/40">
            Balance
          </p>
          <p className="mt-1 text-3xl font-semibold tabular-nums tracking-tight text-black sm:text-4xl">
            {account.balance.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>

        <div className="mt-6 border-t border-black/10 pt-6">
          <TransactionButton
            accountId={accountId}
            account={account}
            accounts={accounts}
            setAccounts={setAccounts}
          />
        </div>
      </section>
    </main>
  );
}

export default AccountPage;
