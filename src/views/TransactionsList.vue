<template lang="pug">
.wrapper
  .buttons
    Button.action(@click.native='subscribeTransactions', type='success') Start
    Button.action(@click.native='unsubscribeTransactions', type='danger') Stop
    Button.action(@click.native='clear', type='warning') Clear
  .container(v-if='transactions.length > 0')
    .title
      | Amount: {{ transactionsAmount }} BTC
    .transactionsTable
      .row.headerRow
        .input
          | From
        .output
          | To
        .amount
          | Amount
      TransactionRow.row(
        v-for='(transaction, index) in transactions',
        :key='transaction.output.join("") + index',
        :inputAddresses='transaction.input',
        :outputAddresses='transaction.output',
        :amount='transaction.amount'
      )
        | {{ transaction }}
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import Button from '@/components/Button'
import TransactionRow from '@/components/TransactionRow'

export default {
  name: 'TransactionsList',
  components: {
    Button,
    TransactionRow,
  },
  computed: {
    ...mapGetters({
      transactions: 'transactions/transactions',
      transactionsAmount: 'transactions/transactionsAmount',
    }),
  },
  mounted() {
    this.initSocket()
  },
  methods: {
    ...mapActions({
      initSocket: 'transactions/initSocket',
      subscribeTransactions: 'transactions/subscribeTransactions',
      unsubscribeTransactions: 'transactions/unsubscribeTransactions',
      clear: 'transactions/clear',
    }),
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  .buttons {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .action {
    &:not(:first-child) {
      margin-left: 10px;
    }
  }

  .headerRow {
    display: flex;
    border-bottom: 1px solid #ccc;

    .input,
    .output {
      flex: 0 0 40%;
    }

    .amount {
      flex: 0 0 20%;
    }
  }

  .container,
  .transactionsTable {
    margin-top: 50px;
  }

  .title {
    font-size: 28px;
    font-weight: bold;
  }
}
</style>
