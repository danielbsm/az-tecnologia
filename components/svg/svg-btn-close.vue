<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      :class="color"
      d="M11.8334 1.34169L10.6584 0.166687L6.00008 4.82502L1.34175 0.166687L0.166748 1.34169L4.82508 6.00002L0.166748 10.6584L1.34175 11.8334L6.00008 7.17502L10.6584 11.8334L11.8334 10.6584L7.17508 6.00002L11.8334 1.34169Z"
      fill="white"
    />
  </svg>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      required: false,
      default: 'white',
    },
    size: {
      type: String,
      required: false,
      default: '12',
    },
  },
}
</script>
<style lang="scss" scoped>
.primary {
  fill: var(--primary) !important;
}
</style>
