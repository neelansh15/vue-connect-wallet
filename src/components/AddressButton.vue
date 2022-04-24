<script lang="ts" setup>
defineProps<{
  address: string | undefined;
}>();
</script>

<template>
  <button
    class="v-btn v-address-btn"
    :title="address"
    :class="$attrs.onClick ? 'v-address-btn-clickable' : null"
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
  background-color: #eee;
}
.v-address-btn-clickable {
  cursor: pointer;
}
.v-address-btn-clickable:hover {
  background-color: #ddd;
}

.v-address-box {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
