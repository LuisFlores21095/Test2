<template>
  <div class="About">
    <login />
  </div>
</template>

<script>
// @ is an alias to /src
import login from "@/components/login.vue";

export default {
  name: "About",
  components: {
    login
  }
};
</script>
