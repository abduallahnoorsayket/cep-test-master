<template>
    <Master>
        <template v-slot:content>

            <div class="app-main__inner">
                <div class="app-page-title">
                    <div class="page-title-wrapper">
                        <div class="page-title-heading">
                            <div class="page-title-icon">
                                <i class="fas fa-user-plus icon-gradient bg-tempting-azure"></i>
                            </div>
                            <div> Create Groups
                                <!-- <div class="page-title-subheading">Admin can create new user from this form.
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>

                <div class="main-card card">
                    <div class="card-body"><h5 class="card-title">Create Group</h5>

                        <!-- <form v-on:submit.prevent="submitUserForm">-->
                        <form @submit.prevent="submitGroupForm">
                            <div class="form-group">
                                <div class="form-row">
                                    <div class="col-md-6">
                                        <div class="position-relative form-group">
                                            <label for="exampleEmail11" class="">Name</label>
                                            <input placeholder="name" id="name" v-model="name"
                                                   type="text"
                                                   class="form-control">
                                        </div>
                                    </div>

                                    <div class="col-md-4 grp-per" v-if="all_permission">
                                        <label for="examplePassword11" class="">Permissions</label>
                                        <div class="position-relative form-check" v-for="prmsn in all_permission"
                                             :key="prmsn.id">
                                            <label class="form-check-label">
                                                <input type="checkbox" name="permissions" :id=prmsn.id
                                                       :value=prmsn.id
                                                       v-model="permissions"
                                                       class="form-check-input">{{prmsn.name}}
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <button @submit.prevent="submitGroupForm"
                                            class="mt-2 btn btn-primary btn-lg float-right">Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </template>
    </Master>
</template>

<script>
    import Master from "../../Master";
    import axios from 'axios'
    import Swal from "sweetalert2";

    export default {
        name: "CreateGroup",
        components: {Master},
        data() {
            return {
                name: '',
                permissions: [],

                all_permission: null

            }
        },
        methods: {
            loadPermission() {
                const token = localStorage.getItem("token");
                axios.get('permissions/', {
                    headers: {
                        Authorization: `token ${token}`,
                    },
                })
                    .then(response => {
                        this.all_permission = response.data
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },


            async submitGroupForm() {
                const token = localStorage.getItem("token");
                const response = await axios.post("groups/", {
                    headers: {
                        Authorization: `token ${token}`,
                    },
                    name: this.name,
                    permissions: this.permissions,
                })
                    .then(response => {
                    Swal.fire({
                        icon: "success",
                        // title: "Yes...",
                        text: "You have successfully create a group..",
                    }).then(result => {
                        this.$router.push('group-list')
                        console.log(result)
                    })
                    console.log(response)
                })
                    .catch(error => {
                        this.error_data = error.response.data
                        console.log('--++', error.response)
                    })
                console.log(response)
            },
        },
        created() {
            this.loadPermission()
        }
    }
</script>

<style scoped>

    .grp-per {
        height: 135px;
        overflow: scroll;
    }

</style>