<template>
  <div class="main">
    <div class="container">
      <div class="row">
        <div class="col-md">
          <ItemList
            title="Prefixos"
            v-bind:items="prefixes"
            v-on:addItem="addPrefix"
            v-on:deleteItem="deletePrefix"
          ></ItemList>
        </div>
        <div class="col-md">
          <ItemList
            title="Sufixos"
            v-bind:items="sufixes"
            v-on:addItem="addSufix"
            v-on:deleteItem="deleteSufix"
          ></ItemList>
        </div>
      </div>
      <br />

      <h5>
        Domain <span class="badge badge-info">{{ domains.length }}</span>
      </h5>
      <div class="card">
        <div class="card-body">
          <ul class="list-group">
            <li
              class="list-group-item"
              v-for="domain in domains"
              v-bind:key="domain.name"
            >
              <div class="row">
                <div class="col-md">
                  {{ domain.name }}
                </div>
                <div class="col-md text-end">
                  <a v-bind:href="domain.checkout" class="btn btn-info">
                    <span class="fa fa-shopping-cart"></span>
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemList from "./ItemList.vue";

export default {
  name: "App",
  components: {
    ItemList,
  },
  data: () => {
    return {
      prefixes: ["Air", "Jet", "Flight"],
      sufixes: ["Hub", "Station", "Mart"],
    };
  },
  methods: {
    addPrefix(prefix) {
      this.prefixes.push(prefix);
    },
    addSufix(sufix) {
      this.sufixes.push(sufix);
    },
    deletePrefix(prefix) {
      this.prefixes.splice(this.prefixes.indexOf(prefix), 1);
    },
    deleteSufix(sufix) {
      this.sufixes.splice(this.sufixes.indexOf(sufix), 1);
    },
  },
  computed: {
    domains() {
      const domains = [];
      for (const prefix of this.prefixes) {
        for (const sufix of this.sufixes) {
          const name = prefix + sufix;
          const url = name.toLowerCase();
          const checkout = `https://checkout.hostgator.com.br/?a=add&sld=${url}&tld=.com.br`;
          domains.push({
            name,
            checkout,
          });
        }
      }

      return domains;
    },
  },
};
</script>

<style>
</style>
