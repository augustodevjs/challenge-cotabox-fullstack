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
        <button type="button" class="confirm" @click="close">Confirmar</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmModal",
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style>
.confirm-modal-backdrop {
  padding: 0 1rem;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
}

.confirm-modal {
  background: #f6f5fc;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.04);
  border-radius: 0.35rem;
  overflow-x: auto;
  display: flex;
  width: 500px;
  padding: 1.5rem;
  flex-direction: column;
}

.confirm-modal-header {
  position: relative;
  margin-bottom: 1rem;
  font-size: 1.35rem;
  font-weight: 500;
  justify-content: space-between;
  align-items: center;
}

.confirm-modal-body {
  position: relative;
}

.confirm-modal-body form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.confirm-modal-body form input {
  padding: 1rem;
  border: none;
  border-radius: 5px;
  font-size: 0.9rem;
  fill: #fff;
  filter: drop-shadow(0px 4px 10px rgba(7, 7, 7, 0.04));
  border: 2px solid transparent;
}

.confirm-modal-body form input:focus {
  outline: 0;
  border: 2px solid #3f97ff;
}

.confirm-modal-footer {
  display: flex;
  justify-content: end;
  gap: 0.5rem;
  margin-top: 1rem;
}

.confirm-modal-footer .confirm,
.confirm-modal-footer .close {
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  padding: 10px 10px;
  width: 100px;
  border-radius: 4px !important;
  border: none;
  transition: background-color 0.1s linear;
}

.confirm-modal-footer .confirm {
  background: #3f97ff;
  color: white;
}

.confirm-modal-footer .close {
  background: rgb(247, 90, 104);
  color: white;
}

.confirm-modal-footer .confirm:hover,
.confirm-modal-footer .close:hover {
  filter: brightness(1.1);
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 24px;
  background: transparent;
}
</style>