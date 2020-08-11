<template>
  <div class="home">
    <tableDisplay />
  </div>
</template>

<script>
// @ is an alias to /src
import tableDisplay from "@/components/tableDisplay.vue";

export default {
  name: "Home",
  components: {
    tableDisplay
  }
};
</script>
