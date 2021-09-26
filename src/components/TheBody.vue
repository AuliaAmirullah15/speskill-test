<template>
  <div class="content" :class="[background, color]">
    <div class="row justify-center">
      <slot name="title">
        <p>SPE Title</p>
      </slot>
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
                (event) => $emit('update-value', event, props.row.code)
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
</template>

<script>
import mixinsConvertToRupiah from "src/mixins/mixins-convert-to-rupiah";

export default {
  mixins: [mixinsConvertToRupiah],
  props: {
    columns: {
      type: Array,
      required: true,
    },
    rows: {
      type: Array,
      required: false,
    },
    total: {
      type: Number,
      required: true,
    },
    background: {
      type: String,
      required: false,
      default: "bg-primary",
    },
    color: {
      type: String,
      required: false,
      default: "text-white",
    },
  },
};
</script>

<style scoped lang="scss">
.bg-spe {
  background: #f4f7fd;
}
</style>
