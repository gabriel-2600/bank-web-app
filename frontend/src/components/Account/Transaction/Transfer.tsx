import { useForm, type SubmitHandler } from "react-hook-form";
import type { AccountInterface } from "../../../types/AccountInterface";
import { errorToast, successfulToast } from "../../../util/toast-notifcation";
import type { Dispatch } from "react";
import { transferApi } from "../../../api/Transaction/transactionApi";
import { getBankAccountApi } from "../../../api/Account/accountApi";

type TransferProps = {
  account: AccountInterface;
  setAccount: Dispatch<AccountInterface>;
};

interface TransferFormInterface {
  toAccountId: number;
  amount: number;
}

const inputClass =
  "w-full rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-sm text-black outline-none transition-colors placeholder:text-black/40 focus:border-[#8494FF]";

function Transfer({ account, setAccount }: TransferProps) {
  const { register, watch, handleSubmit, reset } =
    useForm<TransferFormInterface>();
  const amountValue = watch("amount");
  const hasAmount = Number.isFinite(amountValue);
  const isBalanceSufficient = amountValue <= account.balance;

  const onSubmit: SubmitHandler<TransferFormInterface> = async (data) => {
    if (account.accountId === data.toAccountId) {
      errorToast("Cannot Transfer to Same Account");
      return;
    }

    if (account.balance < data.amount) {
      errorToast("Insufficient Balance");
      return;
    }

    if (!data.toAccountId || !data.amount) {
      errorToast("Invalid Input");
      return;
    }

    const transferData = {
      senderAmount: data.amount,
      senderAccountId: account.accountId,
      recipientAccountId: data.toAccountId,
    };

    try {
      await transferApi(transferData);

      reset();
      successfulToast("Deposit Successful");

      const refreshAccount = await getBankAccountApi(account.accountId);
      setAccount(refreshAccount);
    } catch (error) {
      errorToast(error instanceof Error ? error.message : "Transfer Failed");
    }
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
            type="number"
            className={inputClass}
            placeholder="Recipient account ID"
            {...register("toAccountId", {
              required: true,
              valueAsNumber: true,
            })}
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
