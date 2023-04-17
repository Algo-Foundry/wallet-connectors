import algosdk from "algosdk";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import { getAlgodClient } from "./client.js";

// Contains a list of methods to send transactions via different wallet connectors

const sendPeraWalletTransaction = async (connector, txn, algodClient) => {
    if (connector === undefined) throw new Error("Could not initialize Pera Wallet");

    const txns = [txn];
    const formattedTxns = txns.map((txn) => {
        return {
            txn,
        };
    });

    const signedTxns = await connector.signTransaction([formattedTxns]);

    return submitTxns(algodClient, signedTxns);
};

const sendWalletConnectTransaction = async (connector, txn, algodClient) => {
    // Sign transaction
    // txns is an array of algosdk.Transaction like below
    // i.e txns = [txn, ...someotherTxns], but we've only built one transaction in our case
    const txns = [txn];
    const txnsToSign = txns.map((txn) => {
        const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");

        return {
            txn: encodedTxn,
            message: "Description of transaction being signed",
            // Note: if the transaction does not need to be signed (because it's part of an atomic group
            // that will be signed by another party), specify an empty singers array like so:
            // signers: [],
        };
    });

    const requestParams = [txnsToSign];

    const request = formatJsonRpcRequest("algo_signTxn", requestParams);
    const result = await connector.sendCustomRequest(request);
    const decodedResult = result.map((element) => {
        return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
    });

    return submitTxns(algodClient, decodedResult);
};

const sendDeflyWalletTransaction = async (connector, txn, algodClient) => {
    if (connector === undefined) throw new Error("Could not initialize Defly Wallet");

    const txns = [txn];
    const formattedTxns = txns.map((txn) => {
        return {
            txn,
        };
    });

    const signedTxns = await connector.signTransaction([formattedTxns]);

    return submitTxns(algodClient, signedTxns);
};

const sendSandboxTransaction = async (connector, txn, algodClient) => {
    // for sandbox, connector is the secret key of the connected account
    const signedTxn = txn.signTxn(connector);

    return submitTxns(algodClient, signedTxn);
}

const submitTxns = async (algodClient, signedTxnsData) => {
    // submit txn to chain and wait for confirmation
    const response = await algodClient.sendRawTransaction(signedTxnsData).do();

    await algosdk.waitForConfirmation(algodClient, response.txId, 4);

    return response;
};

const getAccountInfo = async (accountAddr) => {
    const algodClient = getAlgodClient();
    return await algodClient.accountInformation(accountAddr).do();
}

export default {
    sendWalletConnectTransaction,
    sendPeraWalletTransaction,
    sendDeflyWalletTransaction,
    sendSandboxTransaction,
    getAccountInfo
};
