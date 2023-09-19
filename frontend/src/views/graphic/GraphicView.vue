<template>
  <HeaderComponent />
  <div v-if="loading" class="loading">
    <div class="loader-view"></div>
  </div>
  <div class="graph" v-else>
    <div v-if="users.length > 0">
      <Bar :data="data" :options="options" />
    </div>
    <div class="no-data" v-else>Não existem dados disponíveis.</div>
  </div>
</template>

<style src="./style.css"></style>

<script setup>
import { ref, onMounted } from "vue";
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
import { Bar } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const { result, loading, refetch } = useQuery(USERS_QUERY);

const users = ref([]);
const firstName = ref([]);
const participation = ref([]);

const data = {
  labels: firstName.value,
  datasets: [
    {
      label: "Participation",
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
    await refetch();

    if (result.value && result.value.users) {
      users.value = result.value.users;
      firstName.value = users.value.map((user) => user.firstName);
      participation.value = users.value.map((user) => user.participation);

      data.labels = firstName.value;
      data.datasets[0].data = participation.value;
    }
  }
});
</script>
