import { sendRequest } from "../clientApi";

interface CreateAccountData {
  accountName: string;
  balance: number;
}

export const createBankAccountApi = async (
  createAccountData: CreateAccountData,
) => {
  const data = await sendRequest("POST", "/account/create", createAccountData);

  console.log("createBankAccountApi - CREATE ACCOUNT API LINE 9 ", data);
};

export const getAllBankAccountsApi = async () => {
  const data = await sendRequest("GET", "/account/get/all");

  console.log("getAllBankAccountsApi - GET ALL BANK ACCOUNTS LINE 19 ", data);

  return data;
};

export const getBankAccountApi = async (accountId: number) => {
  const data = await sendRequest("GET", `/account/get/${accountId}`);

  console.log("getBankAccountApi - GET BANK ACCOUNT LINE 27", data);

  return data;
};
