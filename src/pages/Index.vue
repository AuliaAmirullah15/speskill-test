<template>
  <q-page>
    <div class="row header">
      <div class="bg-gradient"></div>
    </div>
    <div class="bg-content content">
      <div class="row justify-center">
        <p class="text-h4">SPE Frontend Shop</p>
      </div>
      <div class="row">
        <q-table
          :rows="rows"
          :columns="columns"
          row-key="name"
          class="full-width my-sticky-header-table"
        >
          <template v-slot:body-cell-product="props">
            <q-td :props="props">
              <div class="row">
                <div class="col">
                  <q-img
                    :src="props.row.media_url"
                    spinner-color="white"
                    style="height: 140px; max-width: 150px"
                  />
                </div>
                <div class="col">
                  <p class="text-secondary">{{ props.row.code }}</p>
                  <p>{{ props.row.name }}</p>
                  <p>{{ convertToRupiah(props.row.price) }}</p>
                  <p class="text-negative">{{ props.row.stock }} in stock</p>
                </div>
              </div>
            </q-td>
          </template>
          <template v-slot:body-cell-subtotal="props">
            <q-td :props="props">
              {{ convertToRupiah(props.value) }}
            </q-td>
          </template>
          <template v-slot:bottom>
            <q-space />
            <p class="text-h5">TOTAL {{ convertToRupiah(total) }}</p>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";

const columns = [
  {
    name: "product",
    required: true,
    label: "Product",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "quantity",
    align: "center",
    label: "Quantity",
    field: "quantity",
    sortable: true,
  },
  { name: "subtotal", label: "Subtotal", field: "subtotal", sortable: true },
];

let optionRows = [];

export default {
  name: "PageIndex",
  data() {
    return {
      columns,
      rows: optionRows,
      total: 0,
    };
  },
  methods: {
    async fetchData() {
      await axios({
        method: "get",
        url: "https://spe-academy.spesolution.net/api/recruitment",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer o7Ytbt9XQLI3PgtebJfKSXKEf0XHU74Y",
        },
      })
        .then((response) => {
          console.log("response: ", response.data);
          // this.rows = [...response.data];
          Object.entries(response.data).forEach((v) => {
            const subtotal = v[1].quantity * v[1].product.price;
            this.total += subtotal;

            // console.log(v[1].product.price);
            let temp = {
              name: v[1].product.name,
              quantity: v[1].quantity,
              code: v[1].product.code,
              media_url: v[1].product.media_url,
              price: v[1].product.price,
              stock: v[1].product.stock,
              subtotal: subtotal,
            };
            this.rows.push({ ...temp });
          });
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    },
    convertToRupiah(angka) {
      var rupiah = "";
      var angkarev = angka.toString().split("").reverse().join("");
      for (var i = 0; i < angkarev.length; i++)
        if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ".";
      return (
        "Rp. " +
        rupiah
          .split("", rupiah.length - 1)
          .reverse()
          .join("")
      );
    },
  },

  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped lang="scss">
.header {
  height: 50vh;
}

.bg-gradient {
  height: 100%;
  width: 100%;
  // background-image: linear-gradient(
  //   to right top,
  //   #002f74,
  //   #234489,
  //   #3b5a9e,
  //   #5270b4,
  //   #6888ca,
  //   #679adb,
  //   #67adea,
  //   #69bff8,
  //   #52cffe,
  //   #41dfff,
  //   #46eefa,
  //   #5ffbf1
  // ) !important;
  background-image: linear-gradient(to right, #5ffbf1, #6888ca, #fc00ff);
}

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
