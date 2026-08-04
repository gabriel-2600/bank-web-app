import { sendRequest } from "../clientApi";

interface CreateAccountData {
  accountName: string;
  balance: number;
}

export const createBankAccountApi = async (
  createAccountData: CreateAccountData,
) => {
  const data = await sendRequest("POST", "/account/create", createAccountData);
};

export const getAllBankAccountsApi = async () => {
  const data = await sendRequest("GET", "/account/get/all");

  return data;
};

export const getBankAccountApi = async (accountId: number) => {
  const data = await sendRequest("GET", `/account/get/${accountId}`);

  return data;
};
