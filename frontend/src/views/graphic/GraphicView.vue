<script setup >
import ChartBar from "../../shared/components/chart/ChartBar.vue";
import HeaderComponent from "../../shared/components/header/HeaderComponent.vue";
import { useQuery } from "@vue/apollo-composable";
import { USERS_QUERY } from "../../shared/graphql/user";

const { result } = useQuery(USERS_QUERY);
</script>

<template>
  <HeaderComponent />
  <ChartBar v-bind:item="result" />
</template>