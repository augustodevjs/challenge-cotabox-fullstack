<script>
import ChartBar from "../shared/components/chart/ChartBar.vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";

export default {
  setup() {
    const { result } = useQuery(gql`
      query {
        users {
          id
          firstName
          lastName
          participation
        }
      }
    `);

    return {
      result,
    };
  },
  components: {
    ChartBar,
  },
};
</script>

<template>
  <ChartBar v-bind:item="result" />
</template>

<style>
</style>