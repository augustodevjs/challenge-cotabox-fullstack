<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header"></slot>
        <button type="button" class="btn-close" @click="close">x</button>
      </header>

      <section class="modal-body">
        <form>
          <input
            type="text"
            placeholder="Digite o seu nome"
            v-model="form.firstName"
          />
          <input
            type="text"
            placeholder="Digite o seu último nome"
            v-model="form.lastName"
          />
          <input
            type="number"
            placeholder="Digite a sua partipação"
            v-model="form.participation"
          />
        </form>
      </section>

      <footer class="modal-footer">
        <button type="button" class="close" @click="close">Fechar</button>
        <button type="submit" @click="save" class="save">Salvar</button>
      </footer>
    </div>
  </div>
</template>

<style src="./style.css">
</style>

<script>
import { reactive, toRefs, watch } from "vue";

export default {
  name: "ModalForm",
  props: {
    userData: Object,
  },
  setup(props, { emit }) {
    const { userData } = toRefs(props);

    const form = reactive({
      firstName: "",
      lastName: "",
      participation: "",
    });

    watch(userData, (newUserData) => {
      if (newUserData) {
        form.firstName = newUserData.firstName;
        form.lastName = newUserData.lastName;
        form.participation = newUserData.participation;
      }
    });

    const close = () => {
      emit("close");
    };

    const save = () => {
      emit("save", form);
    };

    return {
      form,
      close,
      save,
    };
  },
};
</script>