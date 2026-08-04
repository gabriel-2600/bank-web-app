import { sendRequest } from "../clientApi";

interface DepositData {
  accountId: number;
  amount: number;
}

interface withdrawData {
  accountId: number;
  amount: number;
}

interface transferData {
  senderAmount: number;
  senderAccountId: number;
  recipientAccountId: number;
}

export const depositApi = async (depositData: DepositData) => {
  const data = await sendRequest("POST", "/transaction/deposit", depositData);
  return data;
};

export const withdrawApi = async (withdrawData: withdrawData) => {
  const data = await sendRequest("POST", "/transaction/withdraw", withdrawData);
  return data;
};

export const transferApi = async (transferData: transferData) => {
  const data = await sendRequest("POST", "/transaction/transfer", transferData);
  return data;
};

export const transactionHistoryApi = async (accountId: number) => {
  const data = await sendRequest("GET", `/transaction/get/all/${accountId}`);

  return data;
};
