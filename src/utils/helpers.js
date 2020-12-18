export const round = (n, multiple) => Math.floor(n / multiple) * multiple

export const formatTransaction = ({ x: transaction }) => ({
  input: transaction.inputs.map(t => t.prev_out.addr),
  output: transaction.out.map(t => t.addr),
  amount: transaction.out.reduce((result, t) => (result += t.value), 0) / 100000000,
})
