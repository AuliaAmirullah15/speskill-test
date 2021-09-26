<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  beforeRouteEnter(_, _2, next) {
    console.log(
      "Hi, before routing, I'd like to validate you if you wouldn't mind... :)"
    );
    next();
  },
};
</script>
