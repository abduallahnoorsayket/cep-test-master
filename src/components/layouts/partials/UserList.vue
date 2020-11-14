<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <div class="page-title-icon">
                <i class="fas fa-list-alt icon-gradient bg-tempting-azure"></i>
              </div>
              <div>
                User List
                <!-- <div class="page-title-subheading">
                  Where you can find all the authenticate users and their
                  informations.
                </div> -->
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <ul class="pagination" v-if="pagination.count">
              <li class="page-item">
                <a href="#"
                  >Showing {{ pagination.showing }} of {{ pagination.count }}</a
                >
              </li>
              <li :class="{ disabled: !pagination.previous }" class="page-item">
                <a href="#!" v-on:click="loadUsers(pagination.previous)"
                  >Previous</a
                >
              </li>

              <li :class="{ disabled: !pagination.next }" class="page-item">
                <a href="#!" v-on:click="loadUsers(pagination.next)">Next</a>
              </li>
            </ul>
          </div>
          <div class="col-md-6"></div>
          <div class="col-md-2">
            <form action="" @submit.prevent="searchUser">
              <input
                class="form-control"
                type="text"
                name=""
                id=""
                v-model="searchName"
              />
            </form>
          </div>
        </div>

        <div class="card" v-for="user in users" :key="user.id">
          <div class="row">
            <div class="col-sm-2">
              <img
                v-if="user.user_profile && user.user_profile.image "
                :src="user.user_profile.image"
                class="rounded-circle"
                height="45"
                width="45"
                alt="user  image"
              />
              <img
                v-else
                width="45"
                height="45"
                class="rounded-circle"
                src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg"
                alt=""
                @error="
                  $event.target.src = '../assets/images/avatars/default.png'
                "
              />

              <p class="mt-2">{{ user.first_name + " " + user.last_name }}</p>
            </div>

            <div class="vl"></div>

            <div class="col-sm-9">
              <div class="row mt-4">
                <div class="col-sm">{{ user.username }}</div>

                <div class="col-sm">
                  <span v-if="user.user_profile">{{
                    user.user_profile.employee_id
                  }}</span>
                </div>

                <div class="col-sm">
                  <span v-if="user.user_profile">{{
                    user.user_profile.joining_date
                  }}</span>
                </div>

                <div class="col-sm">
                  <div class="row">
                    <div class="col-sm">
                      <button
                        class="btn btn-primary btn-sm dropdown-toggle"
                        type="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        More actions
                      </button>
                      <div class="dropdown-menu">
                        <router-link
                          class="dropdown-item"
                          :to="{ name: 'UserDetails', params: { id: user.id } }"
                          >View
                        </router-link>

                        <router-link
                          class="dropdown-item"
                          :to="{ name: 'UpdateUser', params: { id: user.id } }"
                          >Edit
                        </router-link>

                        <a
                          class="dropdown-item"
                          href="#"
                          @click="deleteData(user.id) in users"
                          >Delete</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- <div v-else>Loading...</div> -->
      </div>
    </template>
  </Master>
</template>


<script>
import axios from "axios";
import Master from "../Master";
import Swal from "sweetalert2";
import "../authheader";
// import Pagination from "./Pagination";

export default {
  name: "UserList",
  components: { Master },
  data() {
    return {
      searchName: null,
      users: null,
      pagination: {
        count: null,
        next: null,
        previous: null,
        showing: 0,
      },
    };
  },

  created() {
    this.loadUsers();
  },

  methods: {
    loadUsers: function (page = 1) {
      console.log(page);
      axios
        .get(page == 1 ? "users/?page=" + page : page, {
          params: {
            first_name: this.searchName,
          },
        })
        .then((response) => {
          this.users = response.data.results;
          this.pagination.count = response.data.count;
          this.pagination.next = response.data.next;
          this.pagination.previous = response.data.previous;
          this.pagination.showing = response.data.results.length;
        });
    },

    deleteData: function (id) {
      const currentUser = localStorage.getItem("id");
      console.log(currentUser);
      if (id == currentUser) {
        Swal.fire({
          icon: "error",
          title: "Sorry...",
          text: "Something went wrong! You can not delete yourself !!",
        });
      } else {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            axios.delete("users/" + id + "/").then((response) => {
              if (response.status == 204) {
                this.loadUsers();
              }
            });
            Swal.fire("Deleted!", "Your user has been deleted.", "success");
          } else {
            Swal.fire("Cancelled", "Your user has not been deleted !", "error");
          }
        });
      }
    },
    searchUser() {
      console.log(this.searchName);
      this.loadUsers();
    },
  },
  // end of Methods
};
</script>
<style scoped>
/*@import url('https://fonts.googleapis.com/css?family=Montserrat|Roboto:300,400|Yellowtail');*/

@import url("https://fonts.googleapis.com/css?family=Varela+Round");

.vl {
  border: 1px solid #eeeeee;
}

.row {
  font-family: "Varela Round", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
  margin-bottom: 10px;
  /* margin-top: 10px; */
}

.card {
  margin-top: 30px;
  padding-top: 30px;
}
.card-content p {
  padding-bottom: 3px;
}
</style>



