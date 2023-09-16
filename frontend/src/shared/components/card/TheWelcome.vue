<script setup>
import WelcomeItem from "./WelcomeItem.vue";
</script>

<template>
  <WelcomeItem>
    <template #firstName>João Augusto</template>
    <template #lastName>Nascimento</template>
    <template #participation>50</template>
  </WelcomeItem>

  <WelcomeItem>
    <template #firstName>Firmino</template>
    <template #lastName>Rodrigues</template>
    <template #participation>4</template>
  </WelcomeItem>

  <WelcomeItem>
    <template #firstName>Firmino</template>
    <template #lastName>Rodrigues</template>
    <template #participation>4</template>
  </WelcomeItem>

  <WelcomeItem>
    <template #firstName>Firmino</template>
    <template #lastName>Rodrigues</template>
    <template #participation>4</template>
  </WelcomeItem>

  <WelcomeItem>
    <template #firstName>Firmino</template>
    <template #lastName>Rodrigues</template>
    <template #participation>4</template>
  </WelcomeItem>
</template>

