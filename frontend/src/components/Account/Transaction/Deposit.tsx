import { useForm, type SubmitHandler } from "react-hook-form";

import type { AccountInterface } from "../../../types/AccountInterface";
import { successfulToast } from "../../../util/toast-notifcation";

type DepositProps = {
  accountId: string;
  setAccounts: React.Dispatch<React.SetStateAction<AccountInterface[]>>;
};

interface DepositFormInterface {
  amount: number;
}

const inputClass =
  "w-full rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-sm text-black outline-none transition-colors placeholder:text-black/40 focus:border-[#8494FF]";

function Deposit({ accountId, setAccounts }: DepositProps) {
  const { register, handleSubmit, reset } = useForm<DepositFormInterface>();

  const onSubmit: SubmitHandler<DepositFormInterface> = ({ amount }) => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account.accountID === accountId
          ? { ...account, balance: account.balance + amount }
          : account,
      ),
    );

    reset();
    successfulToast("Deposit Successful");
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8494FF]">
          Deposit
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1.5">
          <label
            htmlFor="deposit-amount"
            className="text-sm font-medium tracking-tight text-black"
          >
            Amount
          </label>
          <input
            id="deposit-amount"
            type="number"
            step="0.01"
            className={inputClass}
            placeholder="0.00"
            {...register("amount", {
              required: true,
              min: 1,
              valueAsNumber: true,
            })}
          />
        </div>

        <button
          type="submit"
          className="mt-1 flex w-fit items-center justify-center rounded-full bg-[#8494FF] px-5 py-2.5 text-sm font-semibold text-white transition-[filter] hover:brightness-105"
        >
          Deposit
        </button>
      </form>
    </div>
  );
}

export default Deposit;
