<script>
import { RouterView, RouterLink } from "vue-router";
export default {
  name: "App",
  components: {
    RouterView,
    RouterLink,
  },
};
</script>

<template>
  <div class="wrapper">
    <img
      alt="Vue logo"
      class="logo"
      src="./shared/assets/logo-cotabox.svg"
      width="250"
      height="70"
    />
    <nav>
      <div>
        <RouterLink class="user" to="/">Usuários</RouterLink>
        <RouterLink to="/graphic">Gráfico</RouterLink>
      </div>
      <button class="primary">Novo Usuário</button>
    </nav>
  </div>

  <RouterView />
  <!-- <div id="slogan">
    <div class="text-center">
      <h1>NameGator</h1>
      <br />

      <h6 class="text-secondary">
        Gerador de nomes utilizando Vue, Next.js and Graphql
      </h6>
    </div>

    <div class="main">
      <DomainList></DomainList>
    </div>
  </div> -->
</template>

<style>
.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.wrapper .logo {
  margin-bottom: 1rem;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 320px;
  padding-bottom: 1rem;
}

nav .user {
  padding-left: 0;
}

nav a.router-link-exact-active,
nav a:active {
  font-weight: 600;
  color: #3f99ff;
  transition: color 0.1s linear;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a:first-of-type {
  border: 0;
}

nav a {
  padding: 0 1rem;
  font-size: 18px;
  border-left: 1px solid rgb(193, 188, 188);
}

@media (max-width: 420px) {
  nav {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>