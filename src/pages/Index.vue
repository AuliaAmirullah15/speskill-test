<template>
  <q-page>
    <the-header :title="title" :timestamp="timestamp" />
    <the-body
      :columns="columns"
      :rows="data"
      :total="total"
      @update-value="changeTotal"
      background="bg-spe"
      color="text-black"
      class="q-gutter-md"
    >
      <template #title>
        <p class="text-title">SPE Frontend Shop</p>
      </template>
      <template #body>
        <div class="flex flex-inline q-gutter-sm">
          <searching
            v-model:searchField="searchField"
            @clear="searchField = ''"
          />
          <q-btn
            round
            color="primary"
            icon="shopping_cart"
            @click="showAds = true"
          />
        </div>
      </template>
    </the-body>
    <q-dialog v-model="showAds">
      <advertisement v-model:stars="stars" />
    </q-dialog>
  </q-page>
</template>

<script>
import mixinsTimeStamp from "src/mixins/mixins-timestamp";
import TheHeader from "src/components/TheHeader.vue";
import TheBody from "src/components/TheBody.vue";
import Searching from "src/components/Searching.vue";
import Advertisement from "src/components/Modal.vue";
import { mapGetters, mapState, mapActions } from "vuex";
import { ref } from "vue";

export default {
  name: "PageIndex",
  mixins: [mixinsTimeStamp],
  data() {
    return {
      title: "<SPE / FRONTEND>",
      timestamp: ref(""),
      searchField: "",
      showAds: ref(false),
      stars: ref(4),
    };
  },
  methods: {
    changeTotal(val, code) {
      const index = this.rows.findIndex((e) => e.code === code);

      if (val > this.rows[index].stock && val > this.rows[index].quantity) {
        this.$q.notify({
          color: "negative",
          message: "Attention! Quantity exceeds the stock!",
          badgeStyle: "display: none",
          position: "top",
          actions: [
            {
              label: "Dismiss",
              color: "white",
              handler: () => {
                /* ... */
              },
            },
          ],
        });
      }

      let payload = {
        index: index,
        val: val,
      };
      this.changeTotalItem(payload);
    },
    ...mapActions("shop", ["fetchData", "changeTotalItem", "updateDataTable"]),
  },
  computed: {
    total() {
      return this.totalAll;
    },
    data: {
      get() {
        return this.rows;
      },
      set(newVal) {
        return newVal;
      },
    },
    ...mapState("shop", ["totalAll"]),
    ...mapGetters("shop", ["columns", "rows", "optionsRows"]),
  },
  watch: {
    searchField() {
      const needle = this.searchField.toLowerCase();
      this.updateDataTable(needle);
      console.log(this.data);
    },
  },
  components: {
    TheHeader,
    TheBody,
    Searching,
    Advertisement,
  },
  mounted() {
    this.fetchData();
  },
  created() {
    setInterval(this.getNow, 1000);
  },
};
</script>

<style lang="scss">
.content {
  padding: 24px;
}

.text-title {
  font-size: 32px;
}

@media (max-width: 576px) {
  .text-title {
    font-size: 24px;
  }
}
</style>

<style lang="sass">
.my-sticky-header-table

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #000
    color: #fff

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>
