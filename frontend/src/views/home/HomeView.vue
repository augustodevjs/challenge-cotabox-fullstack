<script>
import { useQuery, useMutation } from "@vue/apollo-composable";
import CardItem from "../../shared/components/card/CardItem.vue";
import HeaderComponent from "../../shared/components/header/HeaderComponent.vue";
import CreateUserModal from "../../shared/components/modal/ModalComponent.vue";
import UpdateUserModal from "../../shared/components/modal/ModalComponent.vue";
import DeleteUserModal from "../../shared/components/modal/ConfirmMoldal.vue";
import {
  USERS_QUERY,
  CREATE_USER,
  UPDATE_USER,
  REMOVE_USER,
} from "../../shared/graphql/user";
import { ref } from "vue";

export default {
  setup() {
    const userId = ref(null);
    const name_user = ref("");
    const userToEdit = ref(null);
    const isCreateUserModalVisible = ref(false);
    const isUpdateUserModalVisible = ref(false);
    const isDeleteUserModalVisible = ref(false);

    const { mutate: createUser } = useMutation(CREATE_USER);
    const { mutate: updateUser } = useMutation(UPDATE_USER);
    const { mutate: deleteUserById } = useMutation(REMOVE_USER);
    const { result, loading, error, refetch } = useQuery(USERS_QUERY);

    const reset = (form) => {
      form.firstName = "";
      form.lastName = "";
      form.participation = "";
      userId.value = "";
    };

    const handleAdd = () => {
      isCreateUserModalVisible.value = true;
    };

    const handleRemove = async (id) => {
      isDeleteUserModalVisible.value = true;

      const data = result.value.users.find((user) => user.id == id);

      name_user.value = data.firstName;
      userId.value = id;
    };

    const handleEdit = (id) => {
      isUpdateUserModalVisible.value = true;

      const data = result.value.users.find((user) => user.id == id);
      userToEdit.value = data;
      userId.value = data.id;
    };

    const closeModalUserVisible = () => {
      isCreateUserModalVisible.value = false;
    };

    const closeModalUpdateVisible = () => {
      isUpdateUserModalVisible.value = false;
    };

    const closeModalDeleteVisible = () => {
      isDeleteUserModalVisible.value = false;
    };

    // Add User
    const createUserForm = async (form) => {
      let data = {
        firstName: form.firstName,
        lastName: form.lastName,
        participation: form.participation,
      };

      await createUser(data);

      refetch();
      reset(form);
      closeModalUserVisible();
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
    const confirmDeleteUser = async () => {
      const userIdToDelete = userId.value;
      await deleteUserById({ id: userIdToDelete });

      refetch();
      closeModalDeleteVisible();
    };

    return {
      result,
      loading,
      error,
      handleEdit,
      userId,
      handleRemove,
      handleAdd,
      closeModalUserVisible,
      closeModalUpdateVisible,
      closeModalDeleteVisible,
      isCreateUserModalVisible,
      isUpdateUserModalVisible,
      isDeleteUserModalVisible,
      createUserForm,
      updateUserForm,
      name_user,
      confirmDeleteUser,
      userToEdit,
    };
  },
  components: {
    CardItem,
    HeaderComponent,
    CreateUserModal,
    UpdateUserModal,
    DeleteUserModal,
  },
};
</script>

<template>
  <HeaderComponent v-on:addUser="handleAdd" />
  <main>
    <div v-if="loading">Loading...</div>

    <div v-else-if="error">Error: {{ error.message }}</div>

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
    @close="closeModalUserVisible"
    @save="createUserForm"
  >
    <template #header>Cadastro de Usuário</template>
  </CreateUserModal>

  <UpdateUserModal
    v-show="isUpdateUserModalVisible"
    @close="closeModalUpdateVisible"
    @save="updateUserForm"
    :userData="userToEdit"
  >
    <template #header>Edição de Usuário</template></UpdateUserModal
  >

  <DeleteUserModal
    v-show="isDeleteUserModalVisible"
    @close="closeModalDeleteVisible"
    @confirmDeleteUser="confirmDeleteUser"
  >
    <template #header>Remoção de Usuário</template>
    <template #body
      >Tem certeza que deseja excluir o usuário "{{ name_user }}"?</template
    >
  </DeleteUserModal>
</template>
