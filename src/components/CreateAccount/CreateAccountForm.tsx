import { useForm, type SubmitHandler } from "react-hook-form";
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

function CreateAccountForm() {
  const { setAccounts } = useOutletContext<AccountContextType>();
  const { register, handleSubmit, reset } = useForm<AccountFormInterface>();

  const onSubmit: SubmitHandler<AccountFormInterface> = (data) => {
    const accountID = crypto.randomUUID();
    data.accountID = accountID;

    setAccounts((prevAccounts) => [...prevAccounts, data]);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="account-name">Account Name</label>
        <input
          id="account-name"
          {...register("accountName", { required: true })}
        />
      </div>

      <div>
        <label htmlFor="balance">Balance</label>
        <input
          id="balance"
          type="number"
          {...register("balance", { required: true, min: 0 })}
        />
      </div>

      <button type="submit">Create Account</button>
    </form>
  );
}
export default CreateAccountForm;
