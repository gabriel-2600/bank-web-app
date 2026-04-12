import { useForm, type SubmitHandler } from "react-hook-form";

import type { AccountInterface } from "../../../types/AccountInterface";

type TransferProps = {
  accountId: string;
  account: AccountInterface;
  accounts: AccountInterface[];
  setAccounts: React.Dispatch<React.SetStateAction<AccountInterface[]>>;
};

interface TransferFormInterface {
  toAccountID: string;
  amount: number;
}

function Transfer({
  accountId,
  account,
  accounts,
  setAccounts,
}: TransferProps) {
  const { register, handleSubmit, reset } = useForm<TransferFormInterface>();

  const onSubmit: SubmitHandler<TransferFormInterface> = ({
    toAccountID,
    amount,
  }) => {
    if (account.balance < amount) {
      console.log("not enough");
      return;
    }

    const recipientAccount = accounts.find(
      (acc) => acc.accountID === toAccountID,
    );
    if (!recipientAccount?.accountID) {
      console.log("Account ID not found");
      return;
    }

    if (accountId === recipientAccount.accountID) {
      return;
    }

    setAccounts((prevAccounts) =>
      prevAccounts.map((acc) => {
        if (acc.accountID === accountId) {
          return { ...acc, balance: acc.balance - amount };
        }
        if (acc.accountID === recipientAccount.accountID) {
          return { ...acc, balance: acc.balance + amount };
        }
        return acc;
      }),
    );

    reset();
  };

  return (
    <div>
      <h1>Transfer</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="toAccountID">Recipient account ID</label>
          <input
            id="toAccountID"
            type="text"
            {...register("toAccountID", { required: true })}
          />
        </div>

        <div>
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            {...register("amount", {
              required: true,
              min: 0,
              valueAsNumber: true,
            })}
          />
        </div>

        <button type="submit">Transfer</button>
      </form>
    </div>
  );
}

export default Transfer;
