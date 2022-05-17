<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
/*
   Copyright 2022 Neelansh Mathur

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
import Spinner from "./Spinner.vue";
import AddressButton from "./AddressButton.vue";
import Jazzicon from "./Jazzicon.vue";
import { computed } from "vue-demi";

const props = defineProps({
  txnCount: {
    type: Number,
    default: 0,
  },
  address: {
    type: String,
    required: true,
  },
  dark: {
    type: Boolean,
    default: false,
  },
});

const connected = computed(
  () =>
    props.address && props.address.length > 0 && props.address.startsWith("0x")
);
</script>

<template>
  <div class="v-btn-container">
    <transition name="pending-txn-transition">
      <slot v-if="txnCount && connected" name="pending">
        <div class="v-pending">
          <slot name="spinner">
            <Spinner />
          </slot>

          <span style="margin-top: 1px"> {{ txnCount }} pending </span>
        </div>
      </slot>
    </transition>
    <slot name="connectWalletButton" v-if="!connected">
      <button
        v-bind="$attrs"
        class="v-btn v-connect-btn"
        :class="dark ? 'v-connect-btn-dark' : 'v-connect-btn-light'"
      >
        <slot> Connect Wallet </slot>
      </button>
    </slot>
    <slot v-else name="addressButton">
      <AddressButton v-bind="$attrs" :address="address" :dark="dark" :title="address">
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
  border-radius: 10px;
  outline: none;
}

.v-connect-btn-light {
  background-color: #407df8;
  color: white;
}

.v-connect-btn-dark {
  background-color: #f0efef;
  color: #202020;
}

.v-connect-btn-light:hover {
  background-color: #2968e6;
}
.v-connect-btn-dark:hover {
  background-color: #f5f3f3;
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
