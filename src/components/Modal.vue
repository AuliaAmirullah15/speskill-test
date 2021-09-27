<template>
  <q-card class="my-card">
    <q-img
      src="https://i2-prod.dailyrecord.co.uk/incoming/article23800591.ece/ALTERNATES/s1200b/0_RDR_KST_260321SHOP_1JPG.jpg"
    />

    <q-card-section>
      <q-btn
        fab
        color="primary"
        icon="place"
        class="absolute"
        style="top: 0; right: 12px; transform: translateY(-50%)"
      />

      <div class="row no-wrap items-center">
        <div class="col text-h6 ellipsis">Welcome to SPE Frontend Shop</div>
        <div
          class="
            col-auto
            text-grey text-caption
            q-pt-md
            row
            no-wrap
            items-center
          "
        >
          <q-icon name="place" />
          250 ft
        </div>
      </div>

      <q-rating
        :model-value="stars"
        @update:model-value="(event) => $emit('update:stars', event)"
        :max="5"
        size="32px"
      />
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="text-caption text-grey">
        Automobile Industry - Produces Hybrids and Other types of Cars
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions align="right">
      <q-btn v-close-popup flat color="primary" label="Reserve" />
      <q-btn v-close-popup flat color="primary" round icon="close" />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  emits: ["update:stars"],
  props: ["stars"],
};
</script>
