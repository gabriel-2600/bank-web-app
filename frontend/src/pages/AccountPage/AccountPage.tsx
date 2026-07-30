import { useParams } from "react-router";
import type { AccountInterface } from "../../types/AccountInterface";
import { useEffect, useState } from "react";
import { getBankAccountApi } from "../../api/Account/accountApi";
import TransactionButton from "../../components/Account/Transaction/TransactionButton";
import { errorToast } from "../../util/toast-notifcation";
import { transactionHistoryApi } from "../../api/Transaction/transactionApi";
import TransactionHistory from "../../components/Account/Transaction/TransactionHistory";
import type { TransactionHistoryInteface } from "../../types/TransactionHistoryInteface";

function AccountPage() {
  const { accountId } = useParams<{ accountId: string }>();
  const [account, setAccount] = useState<AccountInterface | null>(null);
  const [transactionHistory, setTransactionHistory] = useState<
    TransactionHistoryInteface[]
  >([]);

  useEffect(() => {
    async function getSingleAccount() {
      try {
        const singleAccount = await getBankAccountApi(Number(accountId));

        setAccount(singleAccount);
      } catch (error) {
        errorToast(
          error instanceof Error ? error.message : "Account Retrieval Failed",
        );
      }
    }

    async function getTransactionHistory() {
      try {
        const transactionHistory = await transactionHistoryApi(
          Number(accountId),
        );

        setTransactionHistory(transactionHistory);
      } catch (error) {
        errorToast(
          error instanceof Error
            ? error.message
            : "Transaction History Retrieval Failed",
        );
      }
    }

    getSingleAccount();
    getTransactionHistory();
  }, [accountId]);

  if (!account) {
    return <p>Loading...</p>;
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
          {account.accountId}
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
          <TransactionButton account={account} setAccount={setAccount} />
        </div>
      </section>

      <TransactionHistory transactionHistory={transactionHistory} />
    </main>
  );
}

export default AccountPage;
