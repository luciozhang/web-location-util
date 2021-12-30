<template>
  <LocationDemo />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LocationDemo from "./components/LocationDemo.vue";

export default defineComponent({
  name: "App",
  components: {
    LocationDemo,
  },
});
</script>
