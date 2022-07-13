<script lang="ts" setup>
import { ref } from "vue";
import { ConnectWalletButton, useMetaMaskWallet } from "./index";

const txnCount = ref(1);
// const address = ref("0x08DcE649f86AF45dA8648FaD31D1C33A617C52d1");
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
  else address.value = "0x08DcE649f86AF45dA8648FaD31D1C33A617C52d1";
  const result = await connect();
  console.log("result", result);
  // getAccounts();
  // switchAccounts();
  // switchOrAddChain(56);
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
  </div>
</template>

<style>
/* body {
  color: white;
  background-color: black;
} */
</style>
