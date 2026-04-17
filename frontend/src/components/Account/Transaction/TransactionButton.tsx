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

  const toggleBtn =
    "flex w-full items-center justify-center rounded-full px-3 py-2.5 text-sm font-semibold transition-[filter,colors,border-color,background-color] sm:px-4";

  const hasOpenPanel =
    isDepositClicked || isWithdrawClicked || isTransferClicked;

  return (
    <div className="space-y-4">
      <div>
        <div className="mt-3 grid w-full grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
          <button
            type="button"
            onClick={handleDepositClick}
            className={`${toggleBtn} ${
              isDepositClicked
                ? "bg-[#8494FF] text-white shadow-sm hover:brightness-105"
                : "border border-black/15 bg-white text-black hover:border-[#8494FF]/40 hover:bg-black/5"
            }`}
          >
            {isDepositClicked ? "Cancel" : "Deposit"}
          </button>
          <button
            type="button"
            onClick={handleWithdrawClick}
            className={`${toggleBtn} ${
              isWithdrawClicked
                ? "bg-[#8494FF] text-white shadow-sm hover:brightness-105"
                : "border border-black/15 bg-white text-black hover:border-[#8494FF]/40 hover:bg-black/5"
            }`}
          >
            {isWithdrawClicked ? "Cancel" : "Withdraw"}
          </button>

          <button
            type="button"
            onClick={handleTransferClick}
            className={`${toggleBtn} ${
              isTransferClicked
                ? "bg-[#8494FF] text-white shadow-sm hover:brightness-105"
                : "border border-black/15 bg-white text-black hover:border-[#8494FF]/40 hover:bg-black/5"
            }`}
          >
            {isTransferClicked ? "Cancel" : "Transfer"}
          </button>
        </div>
      </div>

      {hasOpenPanel && (
        <div className="rounded-xl border border-black/10 bg-[#8494FF]/[0.04] p-4 sm:p-5">
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
      )}
    </div>
  );
}

export default TransactionButton;
