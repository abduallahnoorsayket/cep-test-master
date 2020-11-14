<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner">
        <!-- <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <div class="page-title-icon">
                <i class="fas fa-list-alt icon-gradient bg-tempting-azure"></i>
              </div>
              <div>User Details</div>
            </div>
          </div>
        </div> -->

        <!-- new page -->
        <!--  -->

        <div class="container emp-profile" v-if="user">
          <div class="">
            <div class=""><h4 class="header">User details</h4></div>
            <div class="jumbotron">
              <div class="row">
                <div class="col-md-4">
                  <div class="profile-img">                
                    <img v-if="user.user_profile.image"
                      :src="user.user_profile.image"
                      alt=""
                      class="rounded-circle"
                    />
                      <img v-else
                      src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg"
                      alt=""
                      class="rounded-circle"
                    />
                  </div>
                </div>
                <div class="col-md-8">
                  <div class="profile-head">
                    <h5 v-if="user.first_name && user.last_name">
                      {{ user.first_name + " " + user.last_name }}
                    </h5>
                    <h6 v-if="user.username">
                      {{ user.username }}
                    </h6>

                    <h6 v-if="user.user_profile.phone">
                      {{ user.user_profile.phone }}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-md-6">
                <div class="employee">
                  <h4><strong>Employee info</strong></h4>
                  <br />
                  <div class="row">
                    <div class="col-md-6">
                      <label>Employee ID</label>
                    </div>
                    <div class="col-md-6">
                      <p v-if="user.user_profile.employee_id">
                        <ul  id="menu" >
                          <li>
                            {{ user.user_profile.employee_id }}
                          </li>
                        </ul>
                        
                      </p>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <label>Joining Date</label>
                    </div>
                    <div class="col-md-6">
                      <p v-if="user.user_profile.joining_date">
                        <ul  id="menu" >
                          <li>
                            {{ user.user_profile.joining_date }}
                          </li>
                        </ul>
                      </p>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <label>Department Name</label>
                    </div>
                    <div class="col-md-6">
                      <p v-if="user.user_profile.department.department_name">
                         <ul  id="menu" >
                          <li>
                            {{ user.user_profile.department.department_name }}
                          </li>
                        </ul>
                        
                      </p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Department Code </label>
                    </div>
                    <div class="col-md-6">
                      <p v-if="user.user_profile.department.department_code">
                         <ul  id="menu" >
                          <li>
                            {{ user.user_profile.department.department_code }}
                          </li>
                        </ul>
                        
                      </p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Education</label>
                    </div>
                    <div class="col-md-6">
                      <p v-if="user.user_profile.education">
                         <ul  id="menu" >
                          <li>
                            {{ user.user_profile.education }}
                          </li>
                        </ul>
                        
                      </p>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <label>Location</label>
                    </div>
                    <div class="col-md-6">
                      <p v-if="user.user_profile.education">
                         <ul  id="menu" >
                          <li>
                            {{ user.user_profile.location }}
                          </li>
                        </ul>
                        
                      </p>
                    </div>
                  </div>
                   <div class="row">
                    <div class="col-md-6">
                      <label>Skills</label>
                    </div>
                    <div class="col-md-6">
                      <ul id="menu" v-if="user.user_profile.skills">
                        <li
                          v-for="skill in user.user_profile.skills"
                          :key="skill"
                        >
                          {{ skill + ",  " }}
                        </li>
                      </ul>
                    </div>
                  </div>
                 
                </div>
              </div>
              <div class="col-md-6">
                <div class="employee">
                  <h4><strong>Group & Permissions</strong></h4>
                  <br />
                   <div class="row">

                    <div class="col-md-6">

                      <label>Groups</label>
                    </div>
                    <div class="col-md-6">
                      
                      <ul id="menu" v-if="user.groups">
                        <li v-for="group in user.groups" :key="group">
                          <p>{{ group.name }}</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>User permissions</label>
                    </div>
                    <div class="col-md-6">
                      <ul id="menu" v-if="user.user_permissions">
                        <li
                          v-for="permission in user.user_permissions"
                          :key="permission"
                        >
                          <p>{{ permission.name }}</p>
                          <p>{{ permission.codename }}</p>
                          <p>
                            {{ permission.content_type.app_label }}
                          </p>
                          <p>{{ permission.content_type.model }}</p>
                        </li>

                       

                        <!-- <p>
                            {{ permission.content_type.app_label }}
                          </p>
                          <p>{{ permission.content_type.model }}</p> -->

                        <!-- <p>Name: {{ permission.name }}</p>
                          <p>Code: {{ permission.codename }}</p>
                          <p>
                            App level: {{ permission.content_type.app_label }}
                          </p>
                          <p>Model: {{ permission.content_type.model }}</p> -->
                      </ul>
                    </div>
                  </div>
                  
                 
                </div>
              </div>

              <!-- <div class="col-md-8">
                        <div class="tab-content profile-tab" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>User Id</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p v-if="user.id">{{user.id}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Groups</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p v-if="user.groups">{{user.groups}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>User_permissions</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p  v-if="user.user_permissions">{{user.user_permissions}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Employee_id</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p v-if="user.user_profile.employee_id ">{{ user.user_profile.employee_id }}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Joining_date</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p v-if="user.user_profile.joining_date">{{ user.user_profile.joining_date }}</p>
                                            </div>
                                        </div>
                                         <div class="row">
                                            <div class="col-md-6">
                                                <label>Department Name</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p  v-if="user.user_profile.department.department_name">{{ user.user_profile.department.department_name }}</p>
                                            </div>
                                        </div>
                                         <div class="row">
                                            <div class="col-md-6">
                                                <label>Department Code </label>
                                            </div>
                                            <div class="col-md-6">
                                                <p v-if="user.user_profile.department.department_code ">{{ user.user_profile.department.department_code }}</p>
                                            </div>
                                        </div>
                                        
                            </div>
                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Education</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p v-if="user.user_profile.education">{{ user.user_profile.education }}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Location</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p v-if="user.user_profile.location">{{ user.user_profile.location }}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label> Phone</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p v-if="user.user_profile.phone">{{ user.user_profile.phone }}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>skills</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>
                                                   <ul  id="menu">
                                               <li v-for="skill in user.user_profile.skills" :key="skill">
                                            {{ skill }}
                                             </li>
                                              </ul>
                                                </p>
                                            </div>
                                        </div>
                                       
                                <div class="row">
                                    <div class="col-md-12">
                                        <label>short_bio</label><br/>
                                        <p>{{user.short_bio}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> -->
            </div>

            <hr />
            <div class="col-md-12">
              <div class="employee">
                <h4><strong>Short Bio</strong></h4>
                <br />
                <p class="bio" v-if="user.user_profile.short_bio">
                  {{ user.user_profile.short_bio }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Master>
</template>


<script>
import axios from "axios";
import Master from "../Master";

export default {
  name: "UserDetails",
  components: { Master },
  data() {
    return {
      user: null,
    };
  },

  created() {
    axios.get(`users/${this.$route.params.id}/`, {}).then((response) => {
      this.user = response.data;
      console.log(this.user);
    });
  },
};
</script>

<style scoped>
/* @import url("https://fonts.googleapis.com/css?family=Varela+Round");

.vl {
  border: 1px solid #eeeeee;
}

.row {
  font-family: "Varela Round", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
  margin-bottom: 10px;
  
}

.card {
  margin-top: 30px;
  padding-top: 30px;
}

ul#menu li {
  display: inline;
  list-style: none;
} */

/* new profile page */
input.hidden {
  position: absolute;
  left: -9999px;
}

#profile-image1 {
  cursor: pointer;

  width: 100px;
  height: 100px;
  border: 2px solid #03b1ce;
}

.tital {
  font-size: 16px;
  font-weight: 500;
}

.bot-border {
  border-bottom: 1px #f8f8f8 solid;
  margin: 5px 0 5px 0;
}

/*  for profile page */
body {
  background: -webkit-linear-gradient(left, #3931af, #00c6ff);
}

.tab-pane fade show active {
  margin-left: 20px;
}

.employee {
  margin: 50px;
}

.employee_bio {
  margin-bottom: 20px;
}

.header {
  margin-bottom: 10px;
  margin-top: 20px;
  margin-left: 20px;
}

.bio {
  margin-bottom: 20px;
}

ul#menu li {
  display: inline;
  /* list-style: none; */
  list-style: square;
  margin-left: 0;
}

.emp-profile {
  padding: 0;
  margin-top: 3%;
  margin-bottom: 3%;
  /* border-radius: 0rem; */
  background: #fff;
  padding-bottom: 10px;
  padding-top: 10px;
}

.profile-img {
  text-align: center;
}

.profile-img img {
  width: 70%;
  height: 100%;
}

.profile-img .file {
  position: relative;
  overflow: hidden;
  margin-top: -20%;
  width: 70%;
  border: none;
  border-radius: 0;
  font-size: 15px;
  background: #212529b8;
}

.profile-img .file input {
  position: absolute;
  opacity: 0;
  right: 0;
  top: 0;
}

.profile-head h5 {
  color: #333;
}

.profile-head h6 {
  color: #0062cc;
}

.profile-edit-btn {
  border: none;
  border-radius: 1.5rem;
  width: 70%;
  padding: 2%;
  font-weight: 600;
  color: #6c757d;
  cursor: pointer;
}

.proile-rating {
  font-size: 12px;
  color: #818182;
  margin-top: 5%;
}

.proile-rating span {
  color: #495057;
  font-size: 15px;
  font-weight: 600;
}

.profile-head .nav-tabs {
  margin-bottom: 5%;
}

.profile-head .nav-tabs .nav-link {
  font-weight: 600;
  border: none;
}

.profile-head .nav-tabs .nav-link.active {
  border: none;
  border-bottom: 2px solid #0062cc;
}

.profile-work {
  padding: 14%;
  /* margin-top:0; */
  margin-left: 5px;
}

.profile-work p {
  font-size: 12px;
  color: #818182;
  font-weight: 600;
  margin-top: 10%;
}

.profile-work a {
  text-decoration: none;
  color: #495057;
  font-weight: 600;
  font-size: 14px;
}

.profile-work ul {
  /* list-style: none; */
}

.profile-tab label {
  font-weight: 600;
}

.profile-tab p {
  font-weight: 600;
  color: #0062cc;
}

hr {
  margin-top: 25px;
  margin-bottom: 1rem;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
</style>