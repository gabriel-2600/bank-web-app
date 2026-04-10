import { useForm, type SubmitHandler } from "react-hook-form";

import type { AccountInterface } from "../../../types/AccountInterface";

type WithdrawProps = {
  accountId: string;
  account: AccountInterface;
  setAccounts: React.Dispatch<React.SetStateAction<AccountInterface[]>>;
};

interface WithdrawFormInterface {
  amount: number;
}

function Withdraw({ accountId, account, setAccounts }: WithdrawProps) {
  const { register, handleSubmit, reset } = useForm<WithdrawFormInterface>();

  const onSubmit: SubmitHandler<WithdrawFormInterface> = ({ amount }) => {
    if (account.balance < amount) {
      console.log("not enough");
      return;
    }

    setAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account.accountID === accountId
          ? { ...account, balance: account.balance - amount }
          : account,
      ),
    );
    reset();
  };

  return (
    <div>
      <h1>Withdraw</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            {...register("amount", {
              required: true,
              min: 0,
              max: account.balance,
              valueAsNumber: true,
            })}
          />
        </div>

        <button type="submit">Withdraw</button>
      </form>
    </div>
  );
}

export default Withdraw;
