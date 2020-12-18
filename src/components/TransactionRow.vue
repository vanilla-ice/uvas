<template lang="pug">
.transactionRow
  .inputs
    .address(v-for='input in inputAddresses') {{ input }}
  .outputs
    .address(v-for='output in outputAddresses') {{ output }}
  .amount
    div {{ amount }} BTC
</template>

<script>
export default {
  props: {
    inputAddresses: Array,
    outputAddresses: Array,
    amount: Number,
  },
}
</script>

<style lang="scss" scoped>
.transactionRow {
  display: flex;
  border: 1px solid #ccc;
  border-top: 0;

  .inputs,
  .outputs {
    flex: 0 0 40%;
    border-right: 1px solid #ccc;
    padding: 40px;
    max-width: 40%;
  }

  .address {
    word-break: break-all;

    &:not(:first-child) {
      margin-top: 20px;
    }
  }

  .amount {
    flex: 0 0 20%;
    padding: 40px;
  }
}
</style>
