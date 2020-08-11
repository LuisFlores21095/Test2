<template>
  <b-card id="display" class="overflow-auto">
    <div id="dropdown_Container">
      <b-dropdown
        id="dropdown-dropup"
        dropup
        text="Sort By"
        variant="primary"
        class="m-2"
      >
        <b-dropdown-item v-on:click="sortDate">Recent Projects</b-dropdown-item>
        <b-dropdown-item v-on:click="sortByCategory"
          >Order By Category Name</b-dropdown-item
        >
        <b-dropdown-item v-on:click="sortByUserName"
          >Order By UserName</b-dropdown-item
        >
        <b-dropdown-item v-on:click="sortByProjectName"
          >Order By Project Title</b-dropdown-item
        >
      </b-dropdown>
    </div>

    <b-table
      id="my-table"
      :items="items"
      :per-page="perPage"
      :current-page="currentPage"
      small
    ></b-table>

    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
      align="center"
    ></b-pagination>
  </b-card>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    return {
      perPage: 2,
      currentPage: 1,
      items: []
    };
  },
  computed: {
    rows() {
      return this.items.length;
    }
  },
  methods: {
    sortByProjectName() {
      var tempItems = this.items;
      tempItems.sort((a, b) =>
        a.project_title > b.project_title
          ? 1
          : b.project_title > a.project_title
          ? -1
          : 0
      );
      this.items = tempItems;
    },
    sortDate() {
      var tempItems = this.items;
      tempItems.sort((a, b) =>
        a.date_added > b.date_added ? 1 : b.date_added > a.date_added ? -1 : 0
      );
      this.items = tempItems;
    },
    sortByUserName() {
      var tempItems = this.items;
      tempItems.sort((a, b) =>
        a.username > b.username ? 1 : b.username > a.username ? -1 : 0
      );
      this.items = tempItems;
    },
    sortByCategory() {
      var tempItems = this.items;
      tempItems.sort((a, b) => (a.cid > b.cid ? 1 : b.cid > a.cid ? -1 : 0));
      this.items = tempItems;
    }
  },
  created() {
    axios
      .get("http://localhost:8000/data")
      .then(response => {
        this.items = response.data;
        this.sortDate();
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#my-table {
  width: 1400px;
  margin: 20px auto 30px;
}
#display {
  margin-top: 100px;
}
</style>
