<template lang="pug">
.buttonWrapper(:class='type')
  slot
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'common',
      validator: type => ['success', 'danger', 'warning', 'common'].indexOf(type) !== -1,
    },
  },
}
</script>

<style lang="scss" scoped>
.buttonWrapper {
  padding: 10px 20px;
  background: #cacad1;
  border-radius: 4px;
  color: #272643;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease;
  font-size: 18px;
  box-shadow: 0px 0px 2px #cacad1;
  user-select: none;

  &.success {
    background: #a5f590;
  }

  &.danger {
    background: #e42d36;
  }

  &.warning {
    background: #f39817;
  }

  &:hover {
    opacity: 1;
  }
}
</style>
