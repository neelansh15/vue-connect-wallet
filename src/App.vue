<script lang="ts" setup>
import { ref } from "vue";
import ConnectWalletButton from "./components/ConnectWalletButton.vue";

const txnCount = ref(1);
const connected = ref(false);

function toggleConnected() {
  connected.value = !connected.value;
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
        :connected="connected"
        @click="toggleConnected"
        address="0x08DcE649f86AF45dA8648FaD31D1C33A617C52d1"
      />
    </div>
  </div>
</template>
