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
                            <div> Department List
                                <!-- <div class="page-title-subheading">Admin can show the department list from here.
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <table class="table table-striped ">
                            <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Department Name</th>
                                <th scope="col">Department Code</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="department in departments" :key="department.id">
                                <td>{{department.id}}</td>
                                <td>{{department.department_name}}</td>
                                <td>{{department.department_code}}</td>
                                <td class="td_action">
<!--                                    <button type="button" class="btn btn-primary">-->
<!--                                        <i class="fas fa-eye"></i>-->
<!--                                    </button>-->

                                    <button type="button" class="btn btn-success">
                                        <router-link class="item" :to="{ name: 'UpdateDepartment', params: { id: department.id } }">
                                            <i class="fas fa-edit" style="color: #eeeeee"></i>
                                        </router-link>
                                    </button>


                                    <button type="button" class="btn btn-danger">
                                        <i class="fas fa-trash-alt"
                                           @click="deleteDepartmentItem(department.id) in departments">
                                        </i>
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
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
        name: "DepartmentList",
        components: {Master},
        data() {
            return {
                departments: null
            }
        },
        async created() {
            await this.GetDepartmentList();
        },
        methods: {
            GetDepartmentList: function () {
                axios.get("departments/").then((response) => {
                    this.departments = response.data
                    console.log(this.departments);
                    console.log(response.status);
                });
            },

            deleteDepartmentItem: function (id) {
                Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!",
                }).then((response) => {
                    if (response.isConfirmed) {
                        axios.delete("departments/" + id + "/").then((response) => {
                            if (response.status === 204) {
                                this.GetDepartmentList();
                            }
                        });
                        Swal.fire("Deleted!", "Your department has been deleted!!", "success");
                    } else {
                        Swal.fire("Cancelled", "Your department has not been deleted !", "error");
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .table {
        text-align: center;
    }

    .td_action button {
        margin: 3px;
    }
</style>