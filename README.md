# Wallet connector assignment

Complete the wallet connector integration for this sample Dapp. There are 2 objectives in this assignment,

1. A user should be able to connect to either WalletConnect, Pera Wallet, Defly Wallet or the KMD (Sandbox) and perform a payment transaction to another account.
2. Display connected user's balance on the UI. [hint](https://algorand.github.io/js-algorand-sdk/classes/Algodv2.html#accountInformation)

You will need to fill in the wallet integration codes in `wallets.js`, `WalletDemoView.vue` and `kmd.js`.

## Setup instructions

### 1. Install packages
```
yarn install
```

### 2. Update environement variables
1. Copy `.env.example` to `.env`.

### 3. Setup wallets and test accounts
#### WalletConnect
1. [Library](https://docs.walletconnect.com/quick-start/dapps/client) is included in this the project
2. Integration docs can be found [here](https://developer.algorand.org/docs/get-details/walletconnect/#sign-transaction)

#### Pera Wallet
1. Download [Pera Wallet](https://perawallet.app/)
2. Create TestNet accounts under your Pera Wallet.
3. When performing transactions using Pera Wallet, please switch the node settings to TestNet. This can be done via `Settings > Developer Settings > Node Settings > TestNet`
4. [Library](https://github.com/perawallet/connect) is included in this project
5. Integration docs can be found [here](https://docs.perawallet.app/references/pera-connect/)

#### Defly Wallet
1. Download [Defly Wallet](https://defly.app/)
2. Create TestNet accounts under your Defly Wallet.
3. When performing transactions using Pera Wallet, please switch the node settings to TestNet. This can be done via `More > Preferences > Advanced > Developer Mode > TestNet`
4. [Library](https://github.com/perawallet/connect) is included in this project
5. Integration docs can be found [here](https://docs.perawallet.app/references/pera-connect/)

#### Fund TestNet accounts
1. Use the [faucet](https://bank.testnet.algorand.network/) to fund your TestNet accounts. You will need to have some funds to maintain account balance and pay transaction fees.

#### KMD (Sandbox)
1. Refer to the [demo](https://github.com/Algo-Foundry/demo-wallet-connectors) on how to connect to the KMD to get the accounts on Sandbox.

### 4. Use the .env file
```
source .env
```

### 5. Run the Dapp on localhost
```
yarn serve
```
