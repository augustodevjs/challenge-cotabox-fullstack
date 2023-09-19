<script setup>
import { ref } from "vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import CardItem from "../../shared/components/card/CardItem.vue";
import HeaderComponent from "../../shared/components/header/HeaderComponent.vue";
import CreateUserModal from "../../shared/components/modal/modal-form/ModalForm.vue";
import UpdateUserModal from "../../shared/components/modal/modal-form/ModalForm.vue";
import DeleteUserModal from "../../shared/components/modal/confirm-modal/ConfirmModal.vue";
import {
  USERS_QUERY,
  CREATE_USER,
  UPDATE_USER,
  REMOVE_USER,
} from "../../shared/graphql/user";

// Graphql
const { result, loading, error, refetch } = useQuery(USERS_QUERY);
console.log(result);
const { mutate: createUser, loading: createLoading } = useMutation(CREATE_USER);
const { mutate: updateUser, loading: updateLoading } = useMutation(UPDATE_USER);
const { mutate: deleteUser, loading: deleteLoading } = useMutation(REMOVE_USER);

// Ref
const userId = ref(null);
const name_user = ref(null);
const userToEdit = ref(null);
const isCreateUserModalVisible = ref(false);
const isUpdateUserModalVisible = ref(false);
const isDeleteUserModalVisible = ref(false);

// Reset Form
const reset = (form) => {
  userId.value = "";
  form.lastName = "";
  form.firstName = "";
  form.participation = "";
};

// Close Modals
const closeModalAddVisible = () => (isCreateUserModalVisible.value = false);
const closeModalUpdateVisible = () => (isUpdateUserModalVisible.value = false);
const closeModalDeleteVisible = () => (isDeleteUserModalVisible.value = false);

// Create User
const handleAdd = () => (isCreateUserModalVisible.value = true);

const createUserForm = async (form) => {
  let data = {
    firstName: form.firstName,
    lastName: form.lastName,
    participation: form.participation,
  };

  await createUser(data);

  refetch();
  reset(form);
  closeModalAddVisible();
};

// Update User
const handleEdit = (id) => {
  isUpdateUserModalVisible.value = true;

  const data = result.value.users.find((user) => user.id == id);
  userToEdit.value = data;
  userId.value = data.id;
};

const updateUserForm = async (form) => {
  if (!userId.value) {
    return;
  }

  const data = {
    id: userId.value,
    firstName: form.firstName,
    lastName: form.lastName,
    participation: form.participation,
  };

  await updateUser(data);

  refetch();
  reset(form);
  closeModalUpdateVisible();
};

// Delete User
const handleRemove = async (id) => {
  isDeleteUserModalVisible.value = true;

  const data = result.value.users.find((user) => user.id == id);

  name_user.value = data.firstName;
  userId.value = id;
};

const confirmDeleteUser = async () => {
  const userIdToDelete = userId.value;
  await deleteUser({ id: userIdToDelete });

  refetch();
  closeModalDeleteVisible();
};
</script>

<style src="./style.css"></style>

<template>
  <HeaderComponent v-on:addUser="handleAdd" />
  <main>
    <div v-if="loading" class="loader-view"></div>

    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else-if="result.users.length == 0" class="no-data">
      Não existe dados disponíveis.
    </div>

    <ul v-else-if="result && result.users">
      <li v-for="user of result.users" :key="user.id">
        <CardItem
          @editUser="handleEdit(user.id)"
          @deleteUser="handleRemove(user.id)"
        >
          <template #firstName>{{ user.firstName }}</template>
          <template #lastName>{{ user.lastName }}</template>
          <template #participation>{{ user.participation }}</template>
        </CardItem>
      </li>
    </ul>
  </main>

  <CreateUserModal
    v-show="isCreateUserModalVisible"
    @close="closeModalAddVisible"
    @save="createUserForm"
    :loading="createLoading"
  >
    <template #header>Cadastro de Usuário</template>
  </CreateUserModal>

  <UpdateUserModal
    v-show="isUpdateUserModalVisible"
    @close="closeModalUpdateVisible"
    @save="updateUserForm"
    :userData="userToEdit"
    :loading="updateLoading"
  >
    <template #header>Edição de Usuário</template></UpdateUserModal
  >

  <DeleteUserModal
    v-show="isDeleteUserModalVisible"
    @close="closeModalDeleteVisible"
    @confirmDeleteUser="confirmDeleteUser"
    :loading="deleteLoading"
  >
    <template #header>Remoção de Usuário</template>
    <template #body
      >Tem certeza que deseja excluir o usuário "{{ name_user }}"?</template
    >
  </DeleteUserModal>
</template>