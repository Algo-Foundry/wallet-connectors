import { getKmdClient } from "./client";

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
  
  return keys.addresses;
}

const getPrivateKey = async (addr) => {
  const kmdclient = getKmdClient();
  const walletname = process.env.VUE_APP_WALLET_NAME;
  const walletpass = process.env.VUE_APP_WALLET_PASSWORD;
  const wallethandle = await getWalletHandle(walletname, walletpass);
  
  let accountKey = await kmdclient.exportKey(
    wallethandle,
    walletpass,
    addr
  );
  
  return accountKey.private_key;
}

export default {
  getSandboxAccounts,
  getPrivateKey
}