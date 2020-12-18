<template lang="pug">
#app
  .nav
    router-link(to='/main-desk') Desk
    router-link(to='/transactions-list') Transactions
  router-view
</template>

<style lang="scss">
* {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 auto;

  min-height: 100vh;
}

.nav {
  text-align: left;
  padding: 30px;
  box-shadow: 0px 0px 5px #cacad1;

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }

    &:not(:first-child) {
      margin-left: 15px;
    }
  }
}

.container {
  max-width: 1200px;
  padding: 0 15px;
  margin: 0 auto;
}
</style>
