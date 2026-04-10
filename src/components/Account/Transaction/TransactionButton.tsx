import { useState } from "react";
import Transfer from "./Transfer";
import type { AccountInterface } from "../../../types/AccountInterface";
import Withdraw from "./Withdraw";

type TransactionButtonProps = {
  accounts: AccountInterface[];
  accountId: string;
  account: AccountInterface;
  setAccounts: React.Dispatch<React.SetStateAction<AccountInterface[]>>;
};

function TransactionButton({
  accounts,
  accountId,
  account,
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
        {isTransferClicked && <Transfer />}
        {/* {isDepositClicked && } */}
        {isWithdrawClicked && (
          <Withdraw
            accountId={accountId}
            account={account}
            setAccounts={setAccounts}
          />
        )}
      </div>
    </>
  );
}

export default TransactionButton;
