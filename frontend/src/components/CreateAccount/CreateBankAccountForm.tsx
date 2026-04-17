import { useForm, type SubmitHandler } from "react-hook-form";
import { successfulToast } from "../../util/toast-notifcation";
import { useOutletContext } from "react-router";
import type { AccountInterface } from "../../types/AccountInterface";

type AccountContextType = {
  setAccounts: React.Dispatch<React.SetStateAction<AccountInterface[]>>;
};

interface AccountFormInterface {
  accountID: string;
  accountName: string;
  balance: number;
}

function CreateBankAccountForm() {
  const { setAccounts } = useOutletContext<AccountContextType>();
  const { register, handleSubmit, reset } = useForm<AccountFormInterface>();

  const onSubmit: SubmitHandler<AccountFormInterface> = (data) => {
    const accountID = crypto.randomUUID();
    data.accountID = accountID;

    setAccounts((prevAccounts) => [...prevAccounts, data]);
    reset();
    successfulToast("Registered Successfully");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 rounded-2xl border border-black/10 bg-white p-5 shadow-sm sm:mt-6 sm:p-6"
      >
        <div>
          <div className="space-y-1.5">
            <label
              htmlFor="account-name"
              className="text-sm font-medium tracking-tight text-black"
            >
              Account Name
            </label>
            <input
              id="account-name"
              {...register("accountName", { required: true })}
              className="w-full rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-sm text-black outline-none transition-colors placeholder:text-black/40 focus:border-[#8494FF]"
              placeholder="e.g. Savings Account"
            />
          </div>

          <div className="mt-4 space-y-1.5">
            <label
              htmlFor="balance"
              className="text-sm font-medium tracking-tight text-black"
            >
              Balance
            </label>
            <input
              id="balance"
              type="number"
              step="0.01"
              {...register("balance", {
                required: true,
                min: 0,
                valueAsNumber: true,
              })}
              className="w-full rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-sm text-black outline-none transition-colors placeholder:text-black/40 focus:border-[#8494FF]"
              placeholder="0"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-5 flex items-center justify-center rounded-full bg-[#8494FF] px-5 py-2.5 text-sm font-semibold text-white transition-[filter] hover:brightness-105"
        >
          Create Account
        </button>
      </form>
    </>
  );
}
export default CreateBankAccountForm;
