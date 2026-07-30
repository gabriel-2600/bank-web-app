import type { TransactionHistoryInteface } from "../../../types/TransactionHistoryInteface";

interface TransactionProps {
  transactionHistory: TransactionHistoryInteface[];
}

function TransactionHistory({ transactionHistory }: TransactionProps) {
  return (
    <section className="mt-6 rounded-2xl border border-black/10 bg-white p-5 shadow-sm sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8494FF]">
        Transaction History
      </p>

      <ul className="mt-6 space-y-3">
        {[...transactionHistory].reverse().map((transaction) => (
          <li
            key={transaction.transactionId}
            className="flex items-center justify-between rounded-xl border border-black/10 px-4 py-4 transition-colors hover:border-[#8494FF]/40 hover:bg-[#8494FF]/5"
          >
            <div>
              <p className="text-sm font-semibold text-black">
                {transaction.transactionType.replace("_", " ").toUpperCase()}
              </p>
              <p className="mt-1 font-mono text-xs text-black/50">
                Transaction #{transaction.transactionId}
              </p>
              <p className="font-mono text-xs text-black/50">
                Account #{transaction.accountId}
              </p>
            </div>

            <p className="text-lg font-semibold tabular-nums text-black">
              {transaction.amount.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </li>
        ))}

        {transactionHistory.length === 0 && (
          <li className="rounded-xl border border-dashed border-black/20 px-4 py-8 text-center text-sm text-black/50">
            No Transactions Yet
          </li>
        )}
      </ul>
    </section>
  );
}

export default TransactionHistory;
