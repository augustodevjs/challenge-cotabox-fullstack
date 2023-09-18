<template>
  <div class="confirm-modal-backdrop">
    <div class="confirm-modal">
      <header class="confirm-modal-header">
        <slot name="header"></slot>
        <button type="button" class="btn-close" @click="close">x</button>
      </header>

      <section class="confirm-modal-body">
        <slot name="body">Tem certeza de que deseja excluir o usuário?</slot>
      </section>

      <footer class="confirm-modal-footer">
        <button type="button" class="close" @click="close">Fechar</button>
        <button type="button" class="confirm" @click="confirmDeleteUser">
          Confirmar
        </button>
      </footer>
    </div>
  </div>
</template>

<style src="./styles.css">
</style>

<script>
export default {
  name: "ConfirmModal",
  methods: {
    close() {
      this.$emit("close");
    },
    confirmDeleteUser() {
      this.$emit("confirmDeleteUser");
    },
  },
};
</script>