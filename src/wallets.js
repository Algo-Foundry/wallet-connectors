/* eslint-disable */
import algosdk from "algosdk";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import { getAlgodClient } from "./client.js";

// Contains a list of methods to send transactions via different wallet connectors

const sendPeraWalletTransaction = async (connector, txn, algodClient) => {
    // write your code here
};

const sendWalletConnectTransaction = async (connector, txn, algodClient) => {
    // write your code here
};

const sendDeflyWalletTransaction = async (connector, txn, algodClient) => {
    // write your code here
};

const submitTxns = async (algodClient, signedTxnsData) => {
    // submit txn to chain and wait for confirmation
    const response = await algodClient.sendRawTransaction(signedTxnsData).do();

    await algosdk.waitForConfirmation(algodClient, response.txId, 4);

    return response;
};

const getAccountInfo = async (accountAddr) => {
    // wrtie your code here
}

export default {
    sendWalletConnectTransaction,
    sendPeraWalletTransaction,
    sendDeflyWalletTransaction,
    getAccountInfo
};
