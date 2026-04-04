import { useForm, type SubmitHandler } from "react-hook-form";

interface AccountFormInterface {
  accountName: string;
  balance: number;
}

function CreateAccountForm() {
  const { register, handleSubmit } = useForm<AccountFormInterface>();
  const onSubmit: SubmitHandler<AccountFormInterface> = (data) =>
    console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Account Name</label>
        <input {...register("accountName", { required: true })} />
      </div>

      <div>
        <label>Balance</label>
        <input
          type="number"
          {...register("balance", { required: true, min: 0 })}
        />
      </div>

      <input type="submit" />
    </form>
  );
}
export default CreateAccountForm;
