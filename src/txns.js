import algosdk from "algosdk";
import wallets from "./wallets.js";
import { getAlgodClient } from "./client.js";

const createSendAlgosTxn = async (from, to, algosToSend, algodClient) => {
    let suggestedParams = await algodClient.getTransactionParams().do();

    let txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from,
        to,
        amount: Number(algosToSend),
        suggestedParams,
    });

    return txn;
};

const sendPaymentTxn = async (connection, connector, from, to, algosToSend, network) => {
    const algodClient = getAlgodClient(network);
    const txn = await createSendAlgosTxn(from, to, algosToSend, algodClient);
    
    switch (connection) {
        case "perawallet":
            return await wallets.sendPeraWalletTransaction(connector, txn, algodClient);
        case "walletconnect":
            return await wallets.sendWalletConnectTransaction(connector, txn, algodClient);
        case "deflywallet":
            return await wallets.sendDeflyWalletTransaction(txn, algodClient);
        default:
            return;
    }
};

export default {
    sendPaymentTxn,
};