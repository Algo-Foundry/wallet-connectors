<template>
    <div id="sendalgo-app">
        <h3>Select wallet</h3>
        <div class="d-grid gap-2 mb-5">
            <button @click="connectToWalletConnect" class="btn btn-primary mr-3">WalletConnect</button>
            <button @click="connectToPeraWallet" class="btn btn-primary mr-3">Pera Wallet</button>
            <button @click="connectToDeflyWallet" class="btn btn-primary mr-3">Defly Wallet</button>
            <button @click="connectToSandNet" class="btn btn-primary mr-3">Sandbox (SandNet)</button>
        </div>
        <div v-if="this.sender !== ''" class="mb-5">
            <h3>Connected</h3>
            <p>
                Connection: <span>{{ this.connection }}</span>
            </p>
            <p>
                Network: <span>{{ this.network }}</span>
            </p>
            <p>
                Account: <span>{{ this.sender }}</span>
            </p>
            <p>
                Balance (microAlgos): <span>{{ this.balance }}</span>
            </p>
            <button @click="disconnect" class="btn btn-primary">Disconnect</button>
        </div>
        <send-algo-form
            v-if="this.sender !== ''"
            :connection="this.connection"
            :walletclient="this.walletclient"
            :network="this.network"
            :sender="this.sender"
        />
    </div>
</template>

<script>
/* eslint-disable */
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { PeraWalletConnect } from "@perawallet/connect";
import { DeflyWalletConnect } from "@blockshake/defly-connect";
import kmd from "../kmd";
import wallets from "../wallets";

export default {
    data() {
        return {
            connection: "", // walletconnect | perawallet | defly
            walletclient: null, // instance of PeraWalletConnect | DeflyWalletConnect | WalletConnect
            network: "", // network name
            sender: "", // connected account
            balance: 0,
        };
    },
    watch: {
        network: {
            async handler(newSender, oldSender) {
                if (newSender !== oldSender) {
                    // write your code here
                }
            },
            deep: true
        }
    },
    methods: {
        async queryAccountInfo() {
            // call this function upon successful connection

            // write your code here
        },
        async connectToSandNet() {
            this.network = "SandNet";

            // write your code here
        },
        async connectToWalletConnect() {
            this.network = "TestNet";

            // write your code here
        },
        async connectToPeraWallet() {
            this.network = "TestNet";

            // write your code here
        },
        async connectToDeflyWallet() {
            this.network = "TestNet";

            // write your code here
        },
        async disconnect() {
            switch (this.connection) {
                case "perawallet":
                case "deflywallet":
                    await this.walletclient.disconnect();
                    break;
                case "walletconnect":
                    await this.walletclient.killSession();
                    break;
                default:
                    break;
            }

            this.sender = "";
            this.connection = "";
            this.balance = 0;
            this.walletclient = null;
        },
    },
};
</script>
