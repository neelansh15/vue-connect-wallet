<script lang="ts" setup>
import { ref } from "vue";
import { ConnectWalletButton, useMetaMaskWallet, WalletConnect } from "./index";

import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";

const txnCount = ref(1);

const address = ref("");

const {
  connect,
  getAccounts,
  switchAccounts,
  onAccountsChanged,
  switchOrAddChain,
} = useMetaMaskWallet();

async function toggleConnected() {
  if (address.value && address.value.length > 0) address.value = "";
  else address.value = "0xf475D99Be3241c69454eA8AF7B12F38078F697bc";
  const result = await connect();
  console.log("result", result);
  // getAccounts();
  // switchAccounts();
  // switchOrAddChain(56);
  // await addTokenToWallet(
  //   "COMP",
  //   "0x8505b9d2254A7Ae468c0E9dd10Ccea3A837aef5c",
  //   "https://polygonscan.com/token/images/comp_32.png"
  // );
}

async function switchChain() {
  try {
    await switchOrAddChain(1666700000, {
      chainName: "Harmony Testnet Shard 0",
      nativeCurrency: {
        name: "ONE",
        symbol: "ONE",
        decimals: 18,
      },
      rpcUrls: ["https://api.s0.b.hmny.io"],
      blockExplorerUrls: ["https://explorer.pops.one"],
    });
  } catch (e) {
    console.error(e);
  }
}

async function connectWithWalletConnect() {
  const walletConnect = new WalletConnect({
    projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
    metadata: {
      name: "My DApp",
      description: "Some description",
      url: window.location.host,
      icons: [
        "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/icon/vibe.png",
      ],
    },
  });

  console.log("Beginning to connect via WalletConnect...");

  const result = await walletConnect.connect();
  console.log({ result });

  WalletConnectQRCodeModal.open(result.uri, () => {});
}
</script>

<template>
  <pre>
    <h1>
      vue-connect-wallet
  </h1>
  </pre>
  <button @click="txnCount++">Add tx</button>
  <button @click="txnCount > 0 ? txnCount-- : null">Remove tx</button>
  <div style="margin-bottom: 1em"></div>
  <div style="width: 100%">
    <div style="margin: auto">
      <ConnectWalletButton
        :txnCount="txnCount"
        @click="toggleConnected"
        :address="address"
        :dark="false"
      />
    </div>
    <div>
      <h1>Switch to another chain</h1>
      <button @click="switchChain">Switch Chain</button>
    </div>

    <hr />

    <div>
      <h1>Testing WalletConnect</h1>
      <button @click="connectWithWalletConnect">
        Connect with WalletConnect
      </button>
    </div>
  </div>
</template>

<style>
/* body {
  color: white;
  background-color: black;
} */

#mainCanvas {
  width: 300px;
  height: 300px;
  border: 1px solid lightskyblue;
}
</style>
