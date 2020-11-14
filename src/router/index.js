import {createRouter, createWebHistory} from 'vue-router'
import Login from '../views/Login.vue'

// User components
import CreateNewUser from '../components/layouts/partials/CreateNewUser';
import UserList from "../components/layouts/partials/UserList";
import UpdateUser from "../components/layouts/partials/UpdateUser";
import UserDetails from "../components/layouts/partials/UserDetails";
import UserProfile from "../components/layouts/partials/UserProfile";
import Dashboard from "../views/Dashboard";

// Group components
import CreateGroup from "../components/layouts/partials/groups/CreateGroup";
import GroupList from "../components/layouts/partials/groups/GroupList";
import UpdateGroup from "../components/layouts/partials/groups/UpdateGroup";

// department components
import CreateDepartment from "../components/layouts/partials/department/CreateDepartment";
import UpdateDepartment from "../components/layouts/partials/department/UpdateDepartment";
import DepartmentList from "../components/layouts/partials/department/DepartmentList";
import UpdatePassword from "@/components/layouts/partials/update_password/UpdatePassword"
import UpdateProfile from "@/components/layouts/partials/UpdateProfile"


// global
var all_permissions = []
const superuser_status = localStorage.getItem("superuser_status")

// allPermissions
function allPermissions() {
    let groups_obj = JSON.parse(localStorage.getItem("groups"))
    let user_permissions_obj = JSON.parse(localStorage.getItem("user_permissions"))

    if (groups_obj) {
        groups_obj.map(item => {
            item.permissions.map(inner_item => {
                all_permissions.push(inner_item.codename)
            })
        })
    }
    if (user_permissions_obj) {
        user_permissions_obj.map(item => {
            all_permissions.push(item.codename)
        })
    }

}

// hasPermission
function hasPermission(permission_name) {
    // console.log(permission_name)
    return superuser_status || all_permissions.includes(permission_name)
}

// route guard
function guardMyRoute(to, from, next) {
    to.matched.some(record => {
        if (record.meta.authentication_required) {
            if (superuser_status || record.meta.title === 'common') {
                next()
            } else if (localStorage.getItem('id') && hasPermission(record.meta.title)) {
                next()
            } else next('/')
        } else next()
    })
}

// calling allPermissions()
allPermissions()

// routes
const routes = [

    {
        path: '/',
        name: 'Login',
        component: Login,
    },

    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        beforeEnter: guardMyRoute,
        meta: {title: 'common', authentication_required: true}
    },

    {
        path: '/create-new-user',
        name: 'CreateNewUser',
        component: CreateNewUser,
        beforeEnter: guardMyRoute,
        meta: {title: 'add_user', authentication_required: true}

    },

    {
        path: '/user-list',
        name: 'UserList',
        component: UserList,
        beforeEnter: guardMyRoute,
        meta: {title: 'view_user', authentication_required: true}
    },

    {
        path: '/update-user/:id',
        name: 'UpdateUser',
        component: UpdateUser,
        beforeEnter: guardMyRoute,
        meta: {title: 'change_user', authentication_required: true}
    },

    {
        path: '/user-details/:id',
        name: 'UserDetails',
        component: UserDetails,
        beforeEnter: guardMyRoute,
        meta: {title: 'view_user', authentication_required: true}
    },

    {
        path: '/user-profile',
        name: 'UserProfile',
        component: UserProfile,
        beforeEnter: guardMyRoute,
        meta: {title: 'common', authentication_required: true}
    },

    {
        path: '/create-group',
        name: 'CreateGroup',
        component: CreateGroup,
        beforeEnter: guardMyRoute,
        meta: {title: 'add_group', authentication_required: true}
    },

    {
        path: '/update-group/:id',
        name: 'UpdateGroup',
        component: UpdateGroup,
        beforeEnter: guardMyRoute,
        meta: {title: 'change_group', authentication_required: true}
    },

    {
        path: '/group-list',
        name: 'GroupList',
        component: GroupList,
        beforeEnter: guardMyRoute,
        meta: {title: 'view_group', authentication_required: true}
    },

    {
        path: '/create-department',
        name: 'CreateDepartment',
        component: CreateDepartment,
        beforeEnter: guardMyRoute,
        meta: {title: 'add_department', authentication_required: true}
    },

    {
        path: '/update-department/:id',
        name: 'UpdateDepartment',
        component: UpdateDepartment,
        beforeEnter: guardMyRoute,
        meta: {title: 'change_department', authentication_required: true}
    },

    {
        path: '/department-list',
        name: 'DepartmentList',
        component: DepartmentList,
        beforeEnter: guardMyRoute,
        meta: {title: 'view_department', authentication_required: true}
    },

    {
        path: '/update-password',
        name: 'UpdatePassword',
        component: UpdatePassword,
        beforeEnter: guardMyRoute,
        meta: {title: 'common', authentication_required: true}
    },
    {
        path: '/update-profile',
        name: 'UpdateProfile',
        component: UpdateProfile,
        beforeEnter: guardMyRoute,
        meta: {title: 'common', authentication_required: true}
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

// exporting
export default router
