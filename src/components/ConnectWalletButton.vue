<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import Spinner from "./Spinner.vue";
import AddressButton from "./AddressButton.vue";
import Jazzicon from "./Jazzicon.vue";
import { ref } from "vue";

// defineProps<{
//   connected: boolean;
//   txnCount: number | undefined;
//   address: string | undefined;
// }>();

const props = defineProps({
  connected: {
    type: Boolean,
    default: false,
  },
  txnCount: {
    type: Number,
    default: 0,
  },
  address: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <div class="v-btn-container">
    <transition name="pending-txn-transition">
      <slot v-if="txnCount && connected" name="pending">
        <div class="v-pending">
          <slot name="spinner">
            <Spinner />
          </slot>

          <span style="margin-top: 1px;"> {{ txnCount }} pending </span>
        </div>
      </slot>
    </transition>
    <slot name="connectWalletButton" v-if="!connected">
      <button v-bind="$attrs" class="v-btn v-connect-btn">
        <slot> Connect Wallet </slot>
      </button>
    </slot>
    <slot v-else name="accountButton">
      <AddressButton v-bind="$attrs" :address="address">
        <slot name="identicon">
          <Jazzicon :address="address" :diameter="15" style="margin-top: 3px" />
        </slot>
      </AddressButton>
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
.v-pending {
  padding: 0.6em 1.5em 0.7em 1em;
  margin-right: -10px;
  background-color: #005eff;
  color: white;
  border-top-left-radius: 11px;
  border-bottom-left-radius: 11px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 9;
}
.v-btn {
  outline: none;
  border: none;
  transition: all 0.5s;
  z-index: 10;
}

.v-connect-btn {
  padding: 0.75em 1.5em;
  cursor: pointer;
  background-color: #407df8;
  color: white;
  border-radius: 10px;
  outline: none;
}

.v-connect-btn:hover {
  background-color: #2968e6;
}

.pending-txn-transition-enter-active,
.pending-txn-transition-leave-active {
  transition: all 0.5s ease-out;
}

.pending-txn-transition-enter-from,
.pending-txn-transition-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
</style>
