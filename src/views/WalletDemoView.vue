<template>
    <div id="sendalgo-app">
        <h3>Select wallet</h3>
        <div class="d-grid gap-2 mb-5">
            <button @click="connectMyAlgo" class="btn btn-primary">MyAlgo</button>
            <button @click="connectToAlgoSigner" class="btn btn-primary">AlgoSigner (Sandbox)</button>
            <button @click="connectToWalletConnect" class="btn btn-primary mr-3">WalletConnect</button>
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
        </div>
        <send-algo-form
            v-if="this.sender !== ''"
            :connection="this.connection"
            :walletConnector="this.connector"
            :network="this.network"
            :sender="this.sender"
            :receiver="this.receiver"
        />
    </div>
</template>

<script>
/* eslint-disable */

import MyAlgoConnect from "@randlabs/myalgo-connect";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";

export default {
    data() {
        return {
            connection: "", // myalgo | walletconnect | algosigner
            connector: null, // wallet connector obj
            network: "SandNet", // SandNet | TestNet
            sender: "", // connected account
            receiver: "",
        };
    },
    methods: {
        async connectMyAlgo() {
            this.network = "TestNet";

            const myAlgoWallet = new MyAlgoConnect();
            const accounts = await myAlgoWallet.connect();
            this.sender = accounts[0].address;
            this.receiver = accounts[1].address;
            this.connection = "myalgo";
        },
        async connectToAlgoSigner() {
            // force connection to sandbox
            this.network = "SandNet";

            const AlgoSigner = window.AlgoSigner;

            if (typeof AlgoSigner !== "undefined") {
                await AlgoSigner.connect();
                const accounts = await AlgoSigner.accounts({
                    ledger: this.network,
                });

                this.sender = accounts[0].address;
                this.receiver = accounts[1].address;

                this.connection = "algosigner";
            }
        },
        async connectToWalletConnect() {
            this.network = "TestNet";

            // Create a connector
            this.connector = new WalletConnect({
                bridge: "https://bridge.walletconnect.org", // Required
                qrcodeModal: QRCodeModal,
            });

            // Kill existing session
            if (this.connector.connected) {
                await this.connector.killSession();
            }

            this.connector.createSession();

            // Subscribe to connection events
            this.connector.on("connect", (error, payload) => {
                if (error) {
                    throw error;
                }

                const { accounts } = payload.params[0];
                this.sender = accounts[0];
                this.receiver = "DBKB7I3Y3WS4JP6DPHXNDGD2GTANN6WDSM4VSUZO2KQARIT2PB7MNVKIDM";
                this.connection = "walletconnect";
            });

            this.connector.on("session_update", (error, payload) => {
                if (error) {
                    throw error;
                }

                const { accounts } = payload.params[0];
                this.sender = accounts[0];
                this.connection = "walletconnect";
            });

            this.connector.on("disconnect", (error, payload) => {
                if (error) {
                    throw error;
                }

                // Delete connector
                console.log(payload);
                this.sender = "";
                this.connection = "";
            });
        },
    },
};
</script>
