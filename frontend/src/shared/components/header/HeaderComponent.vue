<template>
  <div class="wrapper">
    <img
      alt="Vue logo"
      class="logo"
      src="../../assets/logo-cotabox.svg"
      width="250"
      height="70"
    />
    <nav>
      <div>
        <RouterLink class="user" to="/">Usuários</RouterLink>
        <RouterLink to="/graphic">Gráfico</RouterLink>
      </div>
      <button v-on:click="addUser()" class="primary">Novo Usuário</button>
    </nav>
  </div>
</template>

<style src="./style.css">
</style>

<script>
export default {
  methods: {
    addUser() {
      this.$emit("addUser");
    },
  },
};
</script>
