<template>

  <div class="app-sidebar sidebar-shadow">
    <div class="app-header__logo">
      <div class="logo-src"></div>
      <div class="header__pane ml-auto">
        <div>
          <button type="button" class="hamburger close-sidebar-btn hamburger--elastic"
                  data-class="closed-sidebar">
                                    <span class="hamburger-box">
                                        <span class="hamburger-inner"></span>
                                    </span>
          </button>
        </div>
      </div>
    </div>
    <div class="app-header__mobile-menu">
      <div>
        <button type="button" class="hamburger hamburger--elastic mobile-toggle-nav">
                                <span class="hamburger-box">
                                    <span class="hamburger-inner"></span>
                                </span>
        </button>
      </div>
    </div>
    <div class="app-header__menu">
                        <span>
                            <button type="button"
                                    class="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav">
                                <span class="btn-icon-wrapper">
                                    <i class="fa fa-ellipsis-v fa-w-6"></i>
                                </span>
                            </button>
                        </span>
    </div>

    <!--Authentication-->
    <div class="scrollbar-sidebar">
      <div class="app-sidebar__inner">
        <ul class="vertical-nav-menu">
          <li v-if="hasModulePermission('auth', 'hrm_auth')" class="app-sidebar__heading">Authentication</li>

          <!--User-->
          <li v-if="hasModelPermission('user')">
            <a href="#">
              <i class="metismenu-icon fas fa-users"></i>
              Users
              <i class="metismenu-state-icon pe-7s-angle-down caret-left"></i>
            </a>
            <ul>
              <li v-if="hasPermission('add_user')">
                <router-link :to="{path: '/create-new-user'}">
                  Create New User
                </router-link>
              </li>
              <li v-if="hasPermission('view_user')">
                <router-link :to="{path: '/user-list'}">
                  User List
                </router-link>
              </li>
            </ul>
          </li>

          <!--Groups-->
          <li v-if="hasModelPermission('group')">
            <a href="#">
              <i class="metismenu-icon fas fa-object-group"></i>
              Groups
              <i class="metismenu-state-icon pe-7s-angle-down caret-left"></i>
            </a>
            <ul>
              <li v-if="hasPermission('add_group')">
                <router-link :to="{path: '/create-group'}">
                  Create Group
                </router-link>
              </li>
              <li v-if="hasPermission('view_group')">
                <router-link :to="{path: '/group-list'}">
                  Group List
                </router-link>
              </li>

            </ul>
          </li>

          <!--Department-->
          <li v-if="hasModelPermission('department')">
            <a href="#">
              <i class="metismenu-icon fas fa-puzzle-piece"></i>
              Department
              <i class="metismenu-state-icon pe-7s-angle-down caret-left"></i>
            </a>
            <ul>
              <li v-if="hasPermission('add_department')">
                <router-link :to="{path: '/create-department'}">
                  Create Department
                </router-link>
              </li>
              <li v-if="hasPermission('view_department')">
                <router-link :to="{path: '/department-list'}">
                  Department List
                </router-link>
              </li>

            </ul>
          </li>

        </ul>
      </div>
    </div>
  </div>

</template>

<script>

export default {

  name: "Sidebar",
  data() {
    return {
      all_permissions: [],
      app_label: [],
      model: [],
      superuser_status: false
    }
  },// data

  methods: {
    // removeDuplicates(data) {
    //   return data.filter((value, index) => data.indexOf(value) === index)
    // },// removeDuplicates

    allPermissions() {
      const groups_obj = JSON.parse(localStorage.getItem("groups"))
      const user_permissions_obj = JSON.parse(localStorage.getItem("user_permissions"))

      groups_obj.map(item => {
        item.permissions.map(inner_item => {
          this.all_permissions.push(inner_item.codename)
          this.app_label.push(inner_item.content_type.app_label)
          this.model.push(inner_item.content_type.model)
        })
      })

      user_permissions_obj.map(item => {
        this.all_permissions.push(item.codename)
        this.app_label.push(item.content_type.app_label)
        this.model.push(item.content_type.model)
      })

    },// allPermissions

    hasModulePermission(...module_name) {
      // console.log(module_name)
      return this.superuser_status || module_name.some(m => this.app_label.includes(m))
    },// hasModulePermission

    hasModelPermission(model_name) {
      // console.log(model_name)
      return this.superuser_status || this.model.includes(model_name);
    },// hasModelPermission

    hasPermission(permission_name) {
      // console.log(permission_name)
      return this.superuser_status || this.all_permissions.includes(permission_name)
    },// hasPermission

  },// methods

  created() {
    this.allPermissions()
    this.superuser_status = JSON.parse(localStorage.getItem("superuser_status"))
  }// created

}// export default

</script>

<style scoped>
/* @import ".../main.css"; */
</style>