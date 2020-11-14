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
                            <div> Create Department
                                <!-- <div class="page-title-subheading">Admin can create new user from this form.
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>

                <div class="main-card card">
                    <div class="card-body"><h5 class="card-title">Create Group</h5>

                        <!-- <form v-on:submit.prevent="submitUserForm">-->
                        <form @submit.prevent="submitDepartmentForm">
                            <div class="form-group">
                                <div class="form-row">
                                    <div class="col-md-6">
                                        <div class="position-relative form-group">
                                            <label for="exampleEmail11" class="">Name</label>
                                            <input placeholder="name" id="department_name" v-model="department_name"
                                                   type="text"
                                                   class="form-control">
                                        </div>
                                    </div>

                                    <div class="position-relative form-group">
                                        <label for="exampleEmail11" class="">Department Code</label>
                                        <input placeholder="name" id="department_code" v-model="department_code"
                                               type="text"
                                               class="form-control">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <button @submit.prevent="submitDepartmentForm"
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
    import axios from "axios";
    import Swal from "sweetalert2";

    export default {
        name: "CreateDepartment",
        components: {Master},
        data() {
            return {
                department_name: '',
                department_code: '',
            }
        },
        methods: {
            async submitDepartmentForm() {
                const token = localStorage.getItem("token");
                const response = await axios.post("departments/", {
                    headers: {
                        Authorization: `token ${token}`,
                    },
                    department_name: this.department_name,
                    department_code: this.department_code,
                })
                    .then(response => {
                        Swal.fire({
                            icon: "success",
                            // title: "Yes...",
                            text: "You have successfully create a department..",
                        }).then(result => {
                            this.$router.push('department-list')
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
    }
</script>

<style scoped>

</style>