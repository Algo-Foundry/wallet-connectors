<template>
    <div id="sendalgo-app">
        <h3>Select wallet</h3>
        <div class="d-grid gap-2 mb-5">
            <button @click="connectMyAlgo" class="btn btn-primary">MyAlgo</button>
            <button @click="connectToAlgoSigner" class="btn btn-primary">AlgoSigner</button>
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

            // write your code here

            // update these values upon successful connection
            // this.sender = "";
            // this.receiver = "";
            // this.connection = "myalgo";
        },
        async connectToAlgoSigner() {

            // write your code here
            
            // update these values upon successful connection
            // this.sender = "";
            // this.receiver = "";
            // this.connection = "algosigner";
        },
        async connectToWalletConnect() {
            this.network = "TestNet";

            // write your code here
            
            // update these values upon successful connection
            // this.sender = "";
            // this.receiver = "";
            // this.connection = "algosigner";
        },
    },
};
</script>
