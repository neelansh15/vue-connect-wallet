<script setup lang="ts">
defineProps<{
  connected: boolean;
  txnCount: number | undefined;
  address: string | undefined;
}>();
</script>

<template>
  <div class="v-btn-container">
    <slot v-if="txnCount && connected" name="pending" :txnCount="txnCount">
      <div class="pending">⚪️ &nbsp; {{ txnCount }} pending</div>
    </slot>
    <slot name="connectWalletButton" v-if="!connected">
      <button class="v-btn v-connect-btn">
        <slot> Connect Wallet </slot>
      </button>
    </slot>
    <slot v-else name="accountButton">
      <button class="v-btn">
        <span v-if="address">
          {{
            address.substring(0, 6) +
            "..." +
            address.substring(address.length - 7, address.length - 1)
          }}
        </span>
        <span v-else>Connected</span>
      </button>
    </slot>
  </div>
</template>

<style scoped>
.v-btn-container {
  display: flex;
  /* flex: 1 1 100px; */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 12px;
}
.pending {
  padding: 0.75em 1em 0.5em;
  background-color: rgb(0, 94, 255);
  color: white;
  border-top-left-radius: 11px;
  border-bottom-left-radius: 11px;
}
.v-btn {
  padding: 0.5em 1em;
  outline: none;
  border: 2px solid #eee;
  background-color: #eee;
  cursor: pointer;
  transition: all 0.5s;
}

.v-btn:hover{
  opacity: 0.8;
}

.v-connect-btn {
  background-color: rgb(64, 125, 248);
  color: white;
  border-radius: 10px;
  outline: none;
  padding: 0.5em 1em;
}
</style>
