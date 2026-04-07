import { useOutletContext } from "react-router";
import type { AccountInterface } from "../../types/AccountInterface";

type AccountContextType = {
  accounts: AccountInterface[];
};

function DisplayAccount() {
  const { accounts } = useOutletContext<AccountContextType>();

  return (
    <section>
      <ul>
        {accounts.map((account) => (
          <li>{account.accountName}</li>
        ))}
      </ul>
    </section>
  );
}

export default DisplayAccount;
