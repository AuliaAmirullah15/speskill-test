<template>
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
        <p class="absolute-bottom console-header text-h6">
          {{ title }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "SPE/ FRONTEND",
      required: "false",
    },
    timestamp: {
      default: "",
      required: "true",
    },
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

.console-wrapper {
  top: -350px;
  right: -100px;
  width: 90%;
  height: 100%;
  position: relative;
  background: black;
  color: $positive;
  border: 15px solid $flavor;
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
  color: $positive;
  position: relative;
  display: none;
  border-bottom: 15px solid $flavor;
}

@media (max-width: 959px) {
  .console-wrapper-unflip {
    display: block;
  }
}
</style>
