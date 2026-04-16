import { useForm, type SubmitHandler } from "react-hook-form";

import type { AccountInterface } from "../../../types/AccountInterface";
import { successfulToast } from "../../../util/toast-notifcation";

type WithdrawProps = {
  accountId: string;
  account: AccountInterface;
  setAccounts: React.Dispatch<React.SetStateAction<AccountInterface[]>>;
};

interface WithdrawFormInterface {
  amount: number;
}

const inputClass =
  "w-full rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-sm text-black outline-none transition-colors placeholder:text-black/40 focus:border-[#8494FF]";

function Withdraw({ accountId, account, setAccounts }: WithdrawProps) {
  const { register, watch, handleSubmit, reset } =
    useForm<WithdrawFormInterface>();
  const amountValue = watch("amount");
  const hasAmount = Number.isFinite(amountValue);
  const isBalanceSufficient = amountValue <= account.balance;

  const onSubmit: SubmitHandler<WithdrawFormInterface> = ({ amount }) => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account.accountID === accountId
          ? { ...account, balance: account.balance - amount }
          : account,
      ),
    );

    reset();
    successfulToast("Withdraw Successful");
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8494FF]">
          Withdraw
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1.5">
          <label
            htmlFor="withdraw-amount"
            className="text-sm font-medium tracking-tight text-black"
          >
            Amount
          </label>
          <input
            id="withdraw-amount"
            type="number"
            step="0.01"
            className={inputClass}
            placeholder="0.00"
            {...register("amount", {
              required: true,
              min: 1,
              max: account.balance,
              valueAsNumber: true,
            })}
          />
        </div>

        {hasAmount &&
          (isBalanceSufficient ? (
            <button
              type="submit"
              className="mt-1 flex w-fit items-center justify-center rounded-full bg-[#8494FF] px-5 py-2.5 text-sm font-semibold text-white transition-[filter] hover:brightness-105"
            >
              Withdraw
            </button>
          ) : (
            <p className="mt-1 w-fit rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
              Insufficient Balance
            </p>
          ))}
      </form>
    </div>
  );
}

export default Withdraw;
