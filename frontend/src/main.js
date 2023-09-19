import "./shared/styles/main.css";

import { createApp, provide, h } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";

import App from "./App.vue";
import { router } from "./shared/router";

const apolloClient = new ApolloClient({
  link: createHttpLink({
    uri: "https://nest-api-yber.onrender.com/graphql",
  }),
  cache: new InMemoryCache(),
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
});

app.use(router).mount("#app");
