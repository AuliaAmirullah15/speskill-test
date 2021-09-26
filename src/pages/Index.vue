<template>
  <q-page>
    <the-header :title="title" :timestamp="timestamp" />
    <the-body
      :columns="columns"
      :rows="rows"
      :total="total"
      @update-value="changeTotal"
      background="bg-spe"
      color="text-black"
    >
      <template #title>
        <p class="text-h4">SPE Frontend Shop</p>
      </template>
    </the-body>
  </q-page>
</template>

<script>
import mixinsTimeStamp from "src/mixins/mixins-timestamp";
import TheHeader from "src/components/TheHeader.vue";
import TheBody from "src/components/TheBody.vue";
import { mapGetters, mapState, mapActions } from "vuex";
import { ref } from "vue";

export default {
  name: "PageIndex",
  mixins: [mixinsTimeStamp],
  data() {
    return {
      title: "<SPE / FRONTEND>",
      timestamp: ref(""),
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
    ...mapActions("shop", ["fetchData", "changeTotalItem"]),
  },
  computed: {
    total() {
      return this.totalAll;
    },
    ...mapState("shop", ["totalAll"]),
    ...mapGetters("shop", ["columns", "rows"]),
  },
  components: {
    TheHeader,
    TheBody,
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
