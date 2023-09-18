<template>
  <div class="item">
    <div>
      <h3>
        Primeiro Nome:
        <slot name="firstName"></slot>
      </h3>
      <div class="info-user">
        <div>
          Último Nome:
          <slot name="lastName"></slot>
        </div>
        <div>
          Participação:
          <slot name="participation"></slot>
          vezes
        </div>
      </div>
    </div>

    <div class="details-handle-icons">
      <button v-on:click="editUser()">
        <img alt="edit" src="../../assets/edit-icon.svg" />
      </button>
      <button v-on:click="deleteUser()">
        <img alt="delete" src="../../assets/trash-icon.svg" />
      </button>
    </div>
  </div>
</template>

<style src="./styles.css">
</style>

<script>
export default {
  methods: {
    editUser() {
      this.$emit("editUser");
    },
    deleteUser() {
      this.$emit("deleteUser");
    },
  },
};
</script>