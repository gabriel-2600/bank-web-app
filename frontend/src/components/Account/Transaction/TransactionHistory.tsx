import type { TransactionHistoryInteface } from "../../../types/TransactionHistoryInteface";

interface TransactionProps {
  transactionHistory: TransactionHistoryInteface[];
}

function TransactionHistory({ transactionHistory }: TransactionProps) {
  return (
    <section>
      <ul>
        {transactionHistory.map((transaction) => (
          <li key={transaction.transactionId}>
            <span>{transaction.transactionId}</span>
            <span>{transaction.amount}</span>
            <span>{transaction.transactionType}</span>
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
