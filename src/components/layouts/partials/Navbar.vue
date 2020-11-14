<template>
  <div class="app-header header-shadow">
    <div class="app-header__logo">
      <div class="logo-src"></div>
      <div class="header__pane ml-auto">
        <div>
          <button
            type="button"
            class="hamburger close-sidebar-btn hamburger--elastic"
            data-class="closed-sidebar"
          >
            <span class="hamburger-box">
              <span class="hamburger-inner"></span>
            </span>
          </button>
        </div>
      </div>
    </div>
    <div class="app-header__mobile-menu">
      <div>
        <button
          type="button"
          class="hamburger hamburger--elastic mobile-toggle-nav"
        >
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>
      </div>
    </div>
    <div class="app-header__menu">
      <span>
        <button
          type="button"
          class="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav"
        >
          <span class="btn-icon-wrapper">
            <i class="fa fa-ellipsis-v fa-w-6"></i>
          </span>
        </button>
      </span>
    </div>
    <div class="app-header__content" >
      <div class="app-header-left">
        <div class="search-wrapper">
          <div class="input-holder">
            <input
              type="text"
              class="search-input"
              placeholder="Type to search"
            />
            <button class="search-icon"><span></span></button>
          </div>
          <button class="close"></button>
        </div>
      </div>

      <div class="app-header-right"  >
        <div class="header-btn-lg pr-0">
          <div class="widget-content p-0">
            <div class="widget-content-wrapper">
              <div class="widget-content-left">
                <div class="btn-group">
                  <a
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    class="p-0 btn"
                  >
                  <img v-if="user && user.image"
                      :src="'http://0.0.0.0:8000'+ user.image"
                      alt=""
                      class="rounded-circle" height="40" width="40"
                    />
                    <img v-else
                      width="40"
                      height="40"
                      class="rounded-circle"
                      src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg"
                      alt=""
                      @error="
                        $event.target.src =
                          '../assets/images/avatars/default.png'
                      "
                    />
                    <i class="fa fa-angle-down ml-2 opacity-8"></i>
                  </a>
                  <div
                    tabindex="-1"
                    role="menu"
                    aria-hidden="true"
                    class="dropdown-menu dropdown-menu-right"
                  >
                    <router-link
                      class="dropdown-item"
                      :to="{ name: 'UserProfile' }"
                    >
                      Profile
                    </router-link>

                    <div tabindex="-1" class="dropdown-divider"></div>

                    <button
                      type="button"
                      tabindex="0"
                      class="dropdown-item"
                      @click="logout"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
              <div class="widget-content-left ml-3 header-user-info">
                <div class="widget-heading">
                  <h5 v-if="first_name && last_name">
                    {{ first_name + " " + last_name }}
                  </h5>
                </div>
                <!-- <div class="widget-subheading">Admin</div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Navbar",
  data() {
    return {
      user:null,
      first_name: localStorage.getItem("first_name"),
      last_name: localStorage.getItem("last_name"),
    };
  },
   created() {
    const token = localStorage.getItem("token");

    if (token) {
      this.fetchAuthenticatedUser(token);
    }
  },
  methods: {
     fetchAuthenticatedUser() {
      axios.get("/profiles/me/").then((response) => {
        this.user = response.data;
        console.log(response.data);
      });
    },
    logout() {
      const token = localStorage.getItem("token");

      axios
        .get("logout/", {
          headers: {
            Authorization: `token ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
      localStorage.removeItem("token");

      localStorage.clear();

      this.$router.push("/");
    },
    // end of Logout
  },
  // end of method
};
</script>
<style scoped>
</style>
