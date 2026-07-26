import { sendRequest } from "../clientApi";

interface CreateAccountData {
  accountName: string;
  balance: number;
}

export const createAccountApi = async (
  createAccountData: CreateAccountData,
) => {
  const data = await sendRequest("POST", "/account/create", createAccountData);

  console.log("CREATE ACCOUNT API LINE 9 " + data);
};
