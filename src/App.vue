<script lang="ts" setup>
import ConnectWalletButton from "./components/ConnectWalletButton.vue";
</script>

<template>
  <h1>test</h1>
  <ConnectWalletButton
    :txnCount="1"
    :connected="false"
    address="0x08DcE649f86AF45dA8648FaD31D1C33A617C52d1"
  />
</template>
