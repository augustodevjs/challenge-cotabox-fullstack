<template>
  <div class="wrapper">
    <RouterLink to="/">
      <img
        alt="Vue logo"
        class="logo"
        src="../../assets/logo-cotabox.svg"
        width="250"
        height="70"
      />
    </RouterLink>
    <nav>
      <button v-on:click="handle()" class="primary">
        {{ createUser ? "Voltar" : "Novo Usuário" }}
      </button>
      <button v-if="!createUser" v-on:click="seeGraph()" class="primary">
        Ver Gráfico
      </button>
    </nav>
  </div>
</template>

<style src="./style.css"></style>

<script>
export default {
  props: {
    createUser: Boolean,
  },
  methods: {
    handle() {
      this.$emit("handle");
    },
    seeGraph() {
      this.$emit("seeGraph");
    },
  },
};
</script>
