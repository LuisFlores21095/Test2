<template>
  <b-card id="forum">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    
    <div v-if="successMessage" class="alert alert-success" role="alert">
      {{successMessage}}
</div>
<div  v-if="errorMessage" class="alert alert-danger" role="alert">
  {{errorMessage}}
</div>
    </b-form>
  
  </b-card>
</template>

<script>

import axios from "axios";

export default {

  data() {
    return {
      form: {
        email: "",
        password: "",
      },errorMessage: null,
        successMessage: null,
   
      show: true
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
       axios
          .post("http://localhost:8000/user", {
            email: this.email,
            password: this.password
          })
          .then(response => {
          this.errorMessage = null;
          this.successMessage = response.data.message;
          })
          .catch(error => {
          this.errorMessage = error.response.data.message;
          this.successMessage = null;
          });
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#forum{
  width: 700px;
  margin: 100px auto 0;
}

.alert{
margin-top: 20px;
}
</style>