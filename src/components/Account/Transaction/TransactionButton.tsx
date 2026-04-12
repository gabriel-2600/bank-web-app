import { useState } from "react";
import Transfer from "./Transfer";
import type { AccountInterface } from "../../../types/AccountInterface";
import Withdraw from "./Withdraw";
import Deposit from "./Deposit";

type TransactionButtonProps = {
  accountId: string;
  account: AccountInterface;
  accounts: AccountInterface[];
  setAccounts: React.Dispatch<React.SetStateAction<AccountInterface[]>>;
};

function TransactionButton({
  accountId,
  account,
  accounts,
  setAccounts,
}: TransactionButtonProps) {
  const [isTransferClicked, setIsTransferClicked] = useState(false);
  const [isDepositClicked, setIsDepositClicked] = useState(false);
  const [isWithdrawClicked, setIsWithdrawClicked] = useState(false);

  const handleTransferClick = () => {
    setIsTransferClicked(!isTransferClicked);
    setIsDepositClicked(false);
    setIsWithdrawClicked(false);
  };
  const handleDepositClick = () => {
    setIsDepositClicked(!isDepositClicked);
    setIsTransferClicked(false);
    setIsWithdrawClicked(false);
  };
  const handleWithdrawClick = () => {
    setIsWithdrawClicked(!isWithdrawClicked);
    setIsTransferClicked(false);
    setIsDepositClicked(false);
  };

  return (
    <>
      <div>
        <button onClick={handleTransferClick}>Transfer</button>
        <button onClick={handleDepositClick}>Deposit</button>
        <button onClick={handleWithdrawClick}>Withdraw</button>
      </div>

      <div>
        {isDepositClicked && (
          <Deposit accountId={accountId} setAccounts={setAccounts} />
        )}
        {isWithdrawClicked && (
          <Withdraw
            accountId={accountId}
            account={account}
            setAccounts={setAccounts}
          />
        )}
        {isTransferClicked && (
          <Transfer
            accountId={accountId}
            account={account}
            accounts={accounts}
            setAccounts={setAccounts}
          />
        )}
      </div>
    </>
  );
}

export default TransactionButton;
