<script lang="ts" setup>
defineProps<{
  address: string | undefined;
  dark: boolean;
}>();
</script>

<template>
  <button
    class="v-btn v-address-btn"
    :title="address"
    :class="[
      $attrs.onClick ? 'v-address-btn-clickable' : null,
      dark ? 'v-address-btn-dark' : 'v-address-btn-light',
    ]"
  >
    <div class="v-address-box" v-if="address">
      <slot></slot>
      <b>
        {{
          address.substring(0, 6) +
          "..." +
          address.substring(address.length - 4)
        }}
      </b>
    </div>
    <span v-else>Connected</span>
  </button>
</template>

<style scoped>
.v-address-btn {
  border-radius: 11px;
  padding: 0.65em 1.25em 0.65em 1em;
}
.v-address-btn-light {
  background-color: #eee;
}
.v-address-btn-dark {
  background-color: #212121;
  color: white;
}

.v-address-btn-clickable {
  cursor: pointer;
}
.v-address-btn-light.v-address-btn-clickable:hover  {
  background-color: #ddd;
}
.v-address-btn-dark.v-address-btn-clickable:hover  {
  background-color: #353535;
}

.v-address-box {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
