import { useForm, type SubmitHandler } from "react-hook-form";

import type { AccountInterface } from "../../../types/AccountInterface";
import { errorToast, successfulToast } from "../../../util/toast-notifcation";

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

const inputClass =
  "w-full rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-sm text-black outline-none transition-colors placeholder:text-black/40 focus:border-[#8494FF]";

function Transfer({
  accountId,
  account,
  accounts,
  setAccounts,
}: TransferProps) {
  const { register, watch, handleSubmit, reset } =
    useForm<TransferFormInterface>();
  const amountValue = watch("amount");
  const hasAmount = Number.isFinite(amountValue);
  const isBalanceSufficient = amountValue <= account.balance;

  const onSubmit: SubmitHandler<TransferFormInterface> = ({
    toAccountID,
    amount,
  }) => {
    const recipientAccount = accounts.find(
      (acc) => acc.accountID === toAccountID,
    );
    if (!recipientAccount?.accountID) {
      errorToast("Account Not Found");
      return;
    }

    if (accountId === recipientAccount.accountID) {
      reset();
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
    successfulToast("Transfer Successful");
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8494FF]">
          Transfer
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1.5">
          <label
            htmlFor="transfer-to-account-id"
            className="text-sm font-medium tracking-tight text-black"
          >
            Recipient account ID
          </label>
          <input
            id="transfer-to-account-id"
            type="text"
            className={inputClass}
            placeholder="Recipient account ID"
            {...register("toAccountID", { required: true })}
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="transfer-amount"
            className="text-sm font-medium tracking-tight text-black"
          >
            Amount
          </label>
          <input
            id="transfer-amount"
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

        {hasAmount &&
          (isBalanceSufficient ? (
            <button
              type="submit"
              className="mt-1 flex w-fit items-center justify-center rounded-full bg-[#8494FF] px-5 py-2.5 text-sm font-semibold text-white transition-[filter] hover:brightness-105"
            >
              Transfer
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

export default Transfer;
