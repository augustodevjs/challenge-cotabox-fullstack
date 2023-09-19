<script setup>
import { Bar } from "vue-chartjs";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import HeaderComponent from "../../shared/components/header/HeaderComponent.vue";
import { useQuery } from "@vue/apollo-composable";
import { USERS_QUERY } from "../../shared/graphql/user";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const router = useRouter();
const handle = () => router.push("/");

const { result, loading, refetch, error } = useQuery(USERS_QUERY);

const users = ref([]);
const firstName = ref([]);
const participation = ref([]);
const noCreateUser = ref(true);

const data = {
  labels: firstName.value,
  datasets: [
    {
      label: "Participação",
      backgroundColor: "#3499ff",
      data: participation.value,
    },
  ],
};

const options = {
  responsive: true,
};

onMounted(async () => {
  if (users.value.length === 0) {
    try {
      await refetch();

      if (result.value && result.value.users) {
        users.value = result.value.users;
        firstName.value = users.value.map((user) => user.firstName);
        participation.value = users.value.map((user) => user.participation);

        data.labels = firstName.value;
        data.datasets[0].data = participation.value;
      }
    } catch (e) {
      error.value =
        "Algo de errado aconteceu. Por favor, tente novamente. Se o problema persistir, contate o administrador do sistema.";
    }
  }
});
</script>

<style src="./style.css"></style>

<template>
  <main class="graph">
    <HeaderComponent v-on:handle="handle" :createUser="noCreateUser" />
    <div v-if="loading" class="loading">
      <div class="loader-view"></div>
    </div>

    <div class="graph" v-else>
      <div v-if="users.length > 0">
        <Bar :data="data" :options="options" />
      </div>

      <div class="error" v-else-if="error">
        {{ error }}
      </div>

      <div class="no-data" v-else>Não existem dados disponíveis.</div>
    </div>
  </main>
</template>