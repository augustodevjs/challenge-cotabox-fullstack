<template>
  <div>
    <Bar
      :data="data"
      :options="options"
      v-if="item.users.length > 0 && item && item.users"
    />
    <div class="no-data" v-else>Não existe dados disponíveis.</div>
  </div>
</template>

<script>
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

export default {
  name: "App",
  props: ["item"],
  components: {
    Bar,
  },
  data() {
    const users = this.item.users;
    const firstName = users.map((user) => user.firstName);
    const participation = users.map((user) => user.participation);

    return {
      data: {
        labels: firstName,
        datasets: [
          {
            label: "Participation",
            backgroundColor: "#3499ff",
            data: participation,
          },
        ],
      },
      options: {
        responsive: true,
      },
    };
  },
};
</script>

<style scoped>
.no-data {
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.04);
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 2rem;
  font-weight: 500;
}
</style>
