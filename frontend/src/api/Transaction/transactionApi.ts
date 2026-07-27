import { sendRequest } from "../clientApi";

interface DepositData {
  accountId: number;
  amount: number;
}

interface withdrawData {
  accountId: number;
  amount: number;
}

export const depositApi = async (depositData: DepositData) => {
  const data = await sendRequest("POST", "/transaction/deposit", depositData);

  console.log("depositApi - DEPOSIT API LINE 11 ", data);
};

export const withdrawApi = async (withdrawData: withdrawData) => {
  const data = await sendRequest("POST", "/transaction/withdraw", withdrawData);

  console.log("withdrawApi - WITHDRAW API LINE 17 ", data);
};
