import { getKmdClient } from "./client";
import algosdk from "algosdk";

const getWalletHandle = async (wallet_name, wallet_password) => {
  const kmdclient = getKmdClient();
  let wallets = (await kmdclient.listWallets()).wallets;
  const wallet = wallets.find((item) => {
      return item.name === wallet_name;
  });

  const wallethandle = (await kmdclient.initWalletHandle(wallet.id, wallet_password)).wallet_handle_token;

  return wallethandle;
};

const getSandboxAccounts = async () => {
  const kmdclient = getKmdClient();
  const walletname = process.env.VUE_APP_WALLET_NAME;
  const walletpass = process.env.VUE_APP_WALLET_PASSWORD;
  const wallethandle = await getWalletHandle(walletname, walletpass);
  const keys = await kmdclient.listKeys(wallethandle);
  
  // export secret key for each sandbox account and create an algorand account instance
  const accounts = Promise.all(keys.addresses.map(async (address) => {
    let accountKey = await kmdclient.exportKey(
      wallethandle,
      walletpass,
      address
    );
    let mn = await algosdk.secretKeyToMnemonic(accountKey.private_key);

    return algosdk.mnemonicToSecretKey(mn)
  }));
  
  return accounts;
}

export default {
  getSandboxAccounts
}