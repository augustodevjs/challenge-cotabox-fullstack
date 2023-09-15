<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <img alt="Vue logo" class="logo" src="@/shared/logo-cotabox.svg" width="250" height="70"/>
      <nav>
        <div>
          <RouterLink class="user" to="/">Usuários</RouterLink>
          <RouterLink to="/about">Gráfico</RouterLink>
        </div>
        <button>Novo Usuário</button>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
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

nav a.router-link-exact-active, nav a:active {
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
</style>
