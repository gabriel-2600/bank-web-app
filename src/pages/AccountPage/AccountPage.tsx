import { useOutletContext, useParams } from "react-router";
import type { AccountInterface } from "../../types/AccountInterface";
import TransactionButton from "../../components/Account/Transaction/TransactionButton";

type AppOutletContext = {
  accounts: AccountInterface[];
  setAccounts: React.Dispatch<React.SetStateAction<AccountInterface[]>>;
};

function AccountPage() {
  const { accounts, setAccounts } = useOutletContext<AppOutletContext>();
  const { accountId } = useParams<{ accountId: string }>();
  const account = accounts.find((a) => a.accountID === accountId);

  if (!accountId || !account) {
    throw new Response("Account not found", { status: 404 });
  }

  return (
    <section>
      <div>
        <p>Account Details</p>
        <p>Account ID: {account.accountID}</p>
        <p>Account Name: {account.accountName}</p>
        <p>Account Balance: {account.balance}</p>

        <TransactionButton
          accounts={accounts}
          accountId={accountId}
          account={account}
          setAccounts={setAccounts}
        />
      </div>
    </section>
  );
}

export default AccountPage;
