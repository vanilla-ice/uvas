<template lang="pug">
.card(:style='computedStyles')
  .title(@mousedown='e => $emit("dragStart", e)')
    | {{ card.title }}
    .delete(@click='$emit("delete")') +
  .content
    InlineSvg.resizeIcon(:src='resizeSVG', @mousedown='e => $emit("resizeStart", e)')
</template>

<script>
import InlineSvg from 'vue-inline-svg'
import resizeSVG from '@/assets/expand.svg'
export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
  },

  components: {
    InlineSvg,
  },

  data: () => ({
    resizeSVG,
  }),

  computed: {
    computedStyles() {
      return {
        width: this.card.width + 'px',
        height: this.card.height + 'px',
        left: this.card.x + 'px',
        top: this.card.y + 'px',
        zIndex: this.card.index,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  position: absolute;
  user-select: none;
  box-shadow: 0px 0px 5px #cacad1;
  background: #fff;
  cursor: pointer;

  &::before {
    content: '';
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    box-shadow: 0px 0px 8px #cacad1;
    transition: opacity 0.2s ease;
    pointer-events: none;
  }

  &:hover {
    &::before {
      opacity: 1;
    }
  }
}

.title {
  padding: 10px;
  background: #2c698d;
  color: #fff;
  font-weight: bold;
  position: relative;
}

.resizeIcon {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 12px;
  height: 12px;
  fill: #000;
}

.delete {
  position: absolute;
  top: 7px;
  right: 10px;
  font-size: 24px;
  transform: rotate(45deg);
  width: 15px;
  height: 15px;
  text-align: center;

  &:hover {
    color: #e42d36;
  }
}
</style>
