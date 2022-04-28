<script lang="ts" setup>
import { ref } from "vue";
import ConnectWalletButton from "./components/ConnectWalletButton.vue";

const txnCount = ref(1);
const address = ref("0x08DcE649f86AF45dA8648FaD31D1C33A617C52d1");

function toggleConnected() {
  if (address.value && address.value.length > 0) address.value = "";
  else address.value = "0x08DcE649f86AF45dA8648FaD31D1C33A617C52d1";
}
</script>

<template>
  <h1>test</h1>
  <button @click="txnCount++">Add tx</button>
  <button @click="txnCount > 0 ? txnCount-- : null">Remove tx</button>
  <div style="margin-bottom: 1em"></div>
  <div style="width: 100%">
    <div style="margin: auto">
      <ConnectWalletButton
        :txnCount="txnCount"
        @click="toggleConnected"
        :address="address"
      />
    </div>
  </div>
</template>
