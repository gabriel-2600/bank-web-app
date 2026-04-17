import { useOutletContext, Link } from "react-router";
import type { AccountInterface } from "../../types/AccountInterface";

type AccountContextType = {
  accounts: AccountInterface[];
};

function DisplayAccounts() {
  const { accounts } = useOutletContext<AccountContextType>();

  return (
    <section className="mt-5 rounded-2xl border border-black/10 bg-white p-3 shadow-sm sm:mt-6 sm:p-4">
      <ul className="space-y-2">
        {accounts.map((account) => (
          <li key={account.accountID}>
            <Link
              to={`account/${account.accountID}`}
              className="group flex items-center justify-between rounded-xl border border-black/10 bg-white px-4 py-3 transition-colors hover:border-[#8494FF]/40 hover:bg-[#8494FF]/5"
            >
              <span className="text-sm font-medium text-black sm:text-base">
                {account.accountName}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-black/40 transition-colors group-hover:text-[#8494FF]">
                Open
              </span>
            </Link>
          </li>
        ))}
        {accounts.length === 0 && (
          <li className="rounded-xl border border-dashed border-black/20 px-4 py-8 text-center text-sm text-black/50">
            No accounts available yet.
          </li>
        )}
      </ul>
    </section>
  );
}

export default DisplayAccounts;
