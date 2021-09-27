<template>
  <q-input
    outlined
    dense
    :model-value="searchField"
    @update:modelValue="(event) => $emit('update:searchField', event)"
    class="search-field col"
  >
    <template v-slot:append>
      <q-icon
        v-if="searchField !== ''"
        name="close"
        @click="$emit('clear')"
        clickable
      />
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script>
export default {
  emits: ["update:searchField", "clear"],
  props: {
    searchField: {
      type: String,
    },
  },
};
</script>

<style scoped lang="scss">
.btn-sorting {
  flex: 0 0 50px;
  //   flex: 0 0 150px;
}
</style>
