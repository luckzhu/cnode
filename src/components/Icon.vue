<template>
  <div>
    <svg class="icon" aria-hidden="true">
      <use :xlink:href="`#icon-${name}`"></use>
    </svg>
  </div>
</template>

<script>
import '@/assets/js/svg.js'
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>