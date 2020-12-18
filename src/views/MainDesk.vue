<template lang="pug">
.wrapper(:class='{ isGridVisible }', ref='desk')
  .tools
    Button.action(@click.native='toggleGrid') {{ isGridVisible ? "Hide grid" : "Show grid" }}
    Button.action(v-if='isUndoAvailable', @click.native='undoDelete') Undo
    Button.action(v-if='isCreateAvailable', type='success', @click.native='handleCreate') Create Card

  Card(
    v-for='card in cards',
    :key='card.id',
    :card='card',
    @dragStart='e => handleDragStart(card.id, e)',
    @resizeStart='e => handleResizeStart(card.id, e)',
    @delete='() => deleteCard(card.id)',
    @click.native='() => updateCardOrder(card.id)'
  )
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Card from '@/components/Card'
import Button from '@/components/Button'

import { round } from '@/utils/helpers'
import { CARD_DEFAULT_CONFIG, STEP_SIZE } from '@/store/desk'

export default {
  name: 'MainDesk',

  components: {
    Card,
    Button,
  },

  data: () => ({
    isDragging: false,
    startedX: null,
    startedY: null,
    cachedElement: null,
    isGridVisible: false,
  }),

  computed: {
    ...mapGetters({
      cards: 'desk/cards',
      isUndoAvailable: 'desk/isUndoAvailable',
      isCreateAvailable: 'desk/isCreateAvailable',
    }),
  },

  methods: {
    ...mapActions({
      updateCardPosition: 'desk/updateCardPosition',
      updateCardSize: 'desk/updateCardSize',
      updateCardOrder: 'desk/updateCardOrder',
      createCard: 'desk/createCard',
      deleteCard: 'desk/deleteCard',
      undoDelete: 'desk/undoDelete',
      saveDeck: 'desk/saveDeck',
    }),
    handleDragStart(id, event) {
      this.updateCardOrder(id)
      this.isDragging = true
      this.startedX = event.clientX
      this.startedY = event.clientY
      this.cachedElement = this.cards.find(el => el.id === id)
      document.addEventListener('mousemove', this.handleDragMoving)
      document.addEventListener('mouseup', this.handleDragOver)
    },

    handleDragMoving(e) {
      if (!this.isDragging) return
      const x =
        this.startedX > e.clientX
          ? this.cachedElement.x - (this.startedX - e.clientX)
          : this.cachedElement.x + (e.clientX - this.startedX)
      const y =
        this.startedY > e.clientY
          ? this.cachedElement.y - (this.startedY - e.clientY)
          : this.cachedElement.y + (e.clientY - this.startedY)

      this.updateCardPosition({
        id: this.cachedElement.id,
        x: x > 0 ? round(x, STEP_SIZE) : 0,
        y: y > 0 ? round(y, STEP_SIZE) : 0,
      })
    },

    handleDragOver() {
      this.isDragging = false
      this.startedX = null
      this.startedY = null
      this.cachedElement = null
      document.removeEventListener('mousemove', this.handleDragMoving)
      document.removeEventListener('mouseup', this.handleDragOver)
      this.saveDeck()
    },

    handleResizeStart(id, event) {
      this.updateCardOrder(id)
      this.startedX = event.clientX
      this.startedY = event.clientY
      this.cachedElement = this.cards.find(el => el.id === id)
      document.addEventListener('mousemove', this.handleResizeMoving)
      document.addEventListener('mouseup', this.handleResizeOver)
    },

    handleResizeMoving(e) {
      const width =
        this.startedX > e.clientX
          ? this.cachedElement.width - (this.startedX - e.clientX)
          : this.cachedElement.width + (e.clientX - this.startedX)
      const height =
        this.startedY > e.clientY
          ? this.cachedElement.height - (this.startedY - e.clientY)
          : this.cachedElement.height + (e.clientY - this.startedY)

      this.updateCardSize({
        id: this.cachedElement.id,
        width:
          width > CARD_DEFAULT_CONFIG.width ? round(width, STEP_SIZE) : CARD_DEFAULT_CONFIG.width,
        height:
          height > CARD_DEFAULT_CONFIG.height
            ? round(height, STEP_SIZE)
            : CARD_DEFAULT_CONFIG.height,
      })
    },

    handleResizeOver() {
      this.startedX = null
      this.startedY = null
      this.cachedElement = null
      document.removeEventListener('mousemove', this.handleResizeMoving)
      document.removeEventListener('mouseup', this.handleResizeOver)
      this.saveDeck()
    },

    handleCreate() {
      const desk = this.$refs.desk
      const containerCenter = { x: desk.scrollWidth / 2, y: desk.scrollHeight / 2 }

      const offset = {
        x: desk.scrollLeft / 2,
        y: desk.scrollTop / 2,
      }

      this.createCard({
        centerX: round(containerCenter.x - CARD_DEFAULT_CONFIG.width / 2 + offset.x, STEP_SIZE),
        centerY: round(containerCenter.y - CARD_DEFAULT_CONFIG.height / 2 + offset.y, STEP_SIZE),
      })
    },

    toggleGrid() {
      this.isGridVisible = !this.isGridVisible
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 auto;
  position: relative;
  background: #e3f6f5;
  overflow: auto;

  &.isGridVisible {
    background: radial-gradient(rgb(39, 38, 67) 20%, transparent 20%), #e3f6f5;
    background-position: -15px -15px;
    background-size: 10px 10px;
  }
}

.tools {
  position: fixed;
  left: 30px;
  bottom: 30px;
  z-index: 100;
  display: flex;

  .action {
    &:not(:first-child) {
      margin-left: 10px;
    }
  }
}
</style>
