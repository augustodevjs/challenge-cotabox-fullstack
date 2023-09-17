<script>
import { useQuery, useMutation } from "@vue/apollo-composable";
import CardItem from "../shared/components/card/CardItem.vue";
import HeaderComponent from "../shared/components/header/HeaderComponent.vue";
import CreateUserModal from "../shared/components/modal/ModalComponent.vue";
import UpdateUserModal from "../shared/components/modal/ModalComponent.vue";
import DeleteUserModal from "../shared/components/modal/ConfirmMoldal.vue";
import {
  USERS_QUERY,
  CREATE_USER,
  UPDATE_USER,
  REMOVE_USER,
} from "../shared/graphql/user";
import { reactive, ref } from "vue";

export default {
  setup() {
    const user_id = ref(null);
    const isCreateUserModalVisible = ref(false);
    const isUpdateUserModalVisible = ref(false);
    const isDeleteUserModalVisible = ref(false);

    const { result, loading, error, refetch } = useQuery(USERS_QUERY);
    const { mutate: createUser } = useMutation(CREATE_USER);
    const { mutate: updateUser } = useMutation(UPDATE_USER);
    const { mutate: removeUser } = useMutation(REMOVE_USER);

    const form = reactive({
      firstName: "",
      lastName: "",
      participation: "",
    });

    const saveForm = async () => {
      let data = {
        firstName: form.firstName,
        lastName: form.lastName,
        participation: form.participation,
      };

      if (user_id.value) {
        data.id = user_id.value;
        await updateUser(data);
      } else {
        await createUser(data);
      }

      refetch();
      reset();
    };

    const reset = () => {
      form.firstName = "";
      form.lastName = "";
      form.participation = "";
      user_id.value = "";
    };

    const editUser = (id) => {
      const data = result.value.users.find((user) => user.id == id);

      form.firstName = data.firstName;
      form.lastName = data.lastName;
      form.participation = data.participation;
      user_id.value = id;
    };

    const deleteUser = async (id) => {
      await removeUser({ id });
      refetch();
    };

    const addUser = () => {
      console.log("oi");
      isCreateUserModalVisible.value = true;
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

    return {
      result,
      loading,
      error,
      form,
      saveForm,
      editUser,
      user_id,
      deleteUser,
      addUser,
      closeModalUserVisible,
      closeModalUpdateVisible,
      closeModalDeleteVisible,
      isCreateUserModalVisible,
      isUpdateUserModalVisible,
      isDeleteUserModalVisible,
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
  <HeaderComponent v-on:addUser="addUser" />
  <main>
    <form @submit.prevent="saveForm">
      <input type="text" placeholder="First Name" v-model="form.firstName" />
      <input type="text" placeholder="Last Name" v-model="form.lastName" />
      <input
        type="number"
        placeholder="Participation"
        v-model="form.participation"
      />
      <button type="submit" v-if="user_id">Update</button>
      <button type="submit" v-else>Save</button>
    </form>
    <div v-if="loading">Loading...</div>

    <div v-else-if="error">Error: {{ error.message }}</div>

    <ul v-else-if="result && result.users">
      <li v-for="user of result.users" :key="user.id">
        <CardItem
          @editUser="editUser(user.id)"
          @deleteUser="deleteUser(user.id)"
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
  />
  <UpdateUserModal
    v-show="isUpdateUserModalVisible"
    @close="closeModalUpdateVisible"
  />
  <DeleteUserModal
    v-show="isDeleteUserModalVisible"
    @close="closeModalDeleteVisible"
  />
</template>