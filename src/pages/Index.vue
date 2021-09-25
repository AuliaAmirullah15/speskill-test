<template>
  <q-page>
    <div class="row header">
      <div class="bg-gradient">
        <div class="console-wrapper-unflip">
          <div class="absolute-bottom text-center">
            <p class="console-header-unflip text-h6">{{ title }}</p>
            <p>{{ timestamp }}</p>
          </div>
        </div>
        <div class="console-wrapper">
          <p class="absolute-bottom rotate-text">{{ timestamp }}</p>
          <p class="absolute-bottom console-header text-h6">{{ title }}</p>
        </div>
      </div>
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
            <q-td :props="props" class="flex-inline" style="width: 75%">
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
                  <p class="multiline">{{ props.row.name }}</p>
                  <p>{{ convertToRupiah(props.row.price) }}</p>
                  <p class="text-negative">{{ props.row.stock }} in stock</p>
                </div>
              </div>
            </q-td>
          </template>
          <template v-slot:body-cell-quantity="props">
            <q-td :props="props">
              <q-input
                square
                outlined
                :model-value="props.value"
                type="number"
                @update:modelValue="
                  (event) => changeTotal(event, props.row.code)
                "
              />
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
      title: "<SPE / FRONTEND>",
      timestamp: "",
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

      this.rows[index].quantity = val;
      this.rows[index].subtotal =
        this.rows[index].quantity * this.rows[index].price;
      let temp = 0;
      Object.values(this.rows).forEach((o) => {
        temp += o.subtotal;
      });
      this.total = temp;
    },
    getNow() {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const today = new Date();
      const date =
        monthNames[today.getMonth()] +
        " " +
        today.getDate() +
        " , " +
        today.getFullYear();
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date + " " + time;
      this.timestamp = dateTime;
    },
  },
  mounted() {
    this.fetchData();
  },
  created() {
    setInterval(this.getNow, 1000);
  },
};
</script>

<style scoped lang="scss">
.header {
  height: 80vh;
}

.bg-gradient {
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to right, #5ffbf1, #6888ca, #fc00ff);
}

.content {
  padding: 24px;
}

.console-wrapper {
  top: -350px;
  right: -100px;
  width: 90%;
  height: 100%;
  position: relative;
  background: black;
  color: #00ff00;
  border: 15px solid #eeeeee;
  border-radius: 25px;
  transform: rotate(-20deg);
}

@media (max-width: 960px) {
  .console-wrapper {
    display: none;
  }
}

.console-header {
  margin-left: 60px;
}

.rotate-text {
  margin-left: -85px;
  margin-top: -50px;
  margin-bottom: 100px;
  font-size: 10px;
  width: 200px;
  transform: rotate(90deg);
}

.console-wrapper-unflip {
  height: 40%;
  width: 100%;
  background: black;
  color: #00ff00;
  position: relative;
  display: none;
  border-bottom: 15px solid #eeeeee;
}

@media (max-width: 959px) {
  .console-wrapper-unflip {
    display: block;
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
