<template>
    <div id="sendalgo" class="mb-5">
        <h3>Sending Algos</h3>
        <div v-if="this.txId !== ''" class="alert alert-success" role="alert">
            Txn Ref: <a :href="explorerURL" target="_blank">{{ this.txId }}</a>
        </div>
        <form v-if="this.sender !== ''" action="#" @submit.prevent="sendAlgos">
            <div class="mb-3">
                <label for="amount" class="form-label">microAlgos to send</label>
                <input type="number" class="form-control" id="amount" v-model="amount" />
            </div>
            <div class="mb-3">
                <label for="receiver" class="form-label">Receiver</label>
                <input type="string" class="form-control" id="receiver" v-model="receiverAddr" />
            </div>
            <button type="submit" class="btn btn-primary">Send</button>
        </form>
    </div>
</template>

<script>
import algosdk from "algosdk";
import txns from "../txns";
import WalletConnect from "@walletconnect/client";
import { PeraWalletConnect } from "@perawallet/connect";
import { DeflyWalletConnect } from "@blockshake/defly-connect";

export default {
    props: {
        connection: String,
        walletclient: [WalletConnect, PeraWalletConnect, DeflyWalletConnect],
        network: String,
        sender: String,
    },
    data() {
        return {
            txId: "",
            receiverAddr: "",
            amount: algosdk.algosToMicroalgos(0.1),
            explorerURL: "",
        };
    },
    methods: {
        async sendAlgos() {
            try {
                const response = await txns.sendPaymentTxn(
                    this.connection,
                    this.walletclient,
                    this.sender,
                    this.receiver,
                    this.amount,
                    this.network
                );

                if (response !== undefined) {
                    this.txId = response.txId;
                    this.setExplorerURL(response.txId);
                }
            } catch (err) {
                alert(err.message);
            }
        },
        setExplorerURL(txId) {
            switch (this.network) {
                case "TestNet":
                    this.explorerURL = "https://testnet.algoexplorer.io/tx/" + txId;
                    break;
                default:
                    this.explorerURL = "http://localhost:8980/v2/transactions/" + txId + "?pretty";
                    break;
            }
        },
    },
    async mounted() {
        this.receiverAddr = this.receiver;
    },
};
</script>
