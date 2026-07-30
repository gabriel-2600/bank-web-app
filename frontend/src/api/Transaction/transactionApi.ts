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

  console.log("depositApi - DEPOSIT API LINE 11 ", data);
};

export const withdrawApi = async (withdrawData: withdrawData) => {
  const data = await sendRequest("POST", "/transaction/withdraw", withdrawData);

  console.log("withdrawApi - WITHDRAW API LINE 17 ", data);
};

export const transferApi = async (transferData: transferData) => {
  const data = await sendRequest("POST", "/transaction/transfer", transferData);

  console.log("transferApi - TRANSFER API LINE 33 ", data);
};

export const transactionHistoryApi = async (accountId: number) => {
  const data = await sendRequest("GET", `/transaction/get/all/${accountId}`);

  console.log("transactionHistoryApi - GET TRANSACTION HISTORY LINE 41 ", data);

  return data;
};
