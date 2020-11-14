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
              <div>
                Update profile
                <div class="page-title-subheading"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="main-card card">
          <div class="card-body">
            <form @submit.prevent="editUser" v-if="form_data">
              <div class="form-group">
                <div class="form-row">
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label for="First" class="">First Name</label>
                      <input
                        placeholder="first name"
                        id="first_name"
                        v-model="form_data.user.first_name"
                        type="text"
                        class="form-control"
                      />
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label for="Last" class="">Last Name</label>
                      <input
                        placeholder="last name"
                        id="last_name"
                        v-model="form_data.user.last_name"
                        type="text"
                        class="form-control"
                      />
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label for="exampleEmail11" class="">Email</label>
                      <input
                        name="email"
                        id="email"
                        v-model="form_data.user.username"
                        placeholder="Email"
                        type="email"
                        class="form-control"
                      />
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label for="examplePassword11" class="">Phone</label>
                      <input
                        name="phone"
                        id="phone"
                        v-model="form_data.phone"
                        placeholder="+880"
                        type="text"
                        class="form-control"
                      />
                    </div>
                  </div>

                  <div class="vl mr-lg-5"></div>
                </div>

                <div class="position-relative form-group mt-3">
                  <label for="exampleAddress" class="">Location</label
                  ><input
                    name="address"
                    id="location"
                    v-model="form_data.location"
                    placeholder="Your Location"
                    type="text"
                    class="form-control"
                  />
                </div>

                <div class="form-row">
                  <div class="col-md-6">
                    <label for="exampleAddress" class="">Education</label>
                    <input
                      name="address"
                      id="education"
                      v-model="form_data.education"
                      placeholder="Last Completed Degree"
                      type="text"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="position-relative form-group mt-3">
                  <label for="exampleAddress" class="">Skill</label>
                  <input
                    name="address"
                    id="skills"
                    v-model="form_data.skills"
                    placeholder="Your Skill"
                    type="text"
                    class="form-control"
                  />
                </div>

                <div class="position-relative form-group">
                  <label for="exampleAddress2" class="">Short Bio</label>
                  <textarea
                    name="address2"
                    id="short_bio"
                    v-model="form_data.short_bio"
                    placeholder="About Your Bio"
                    type="text"
                    class="form-control"
                    rows="4"
                    cols="50"
                  ></textarea>
                </div>

                <div class="position-relative form-group">
                  <!-- <textarea name="" id="imageID" cols="30" rows="10"></textarea> -->

                  <!-- <img  src="/media/images/b76aae76-2dc.png" id="imageID" /> -->
                  <label for="img">Select image:</label>

                  <!-- <input type="file" accept="image/*" @change="handleImage" /> -->

                  <input
                    type="file"
                    accept="image/*"
                    @change="handleImage"
                    id="file"
                  />
                </div>
                <div id="hello">
                  <img v-if="form_data.image" :src="'http://0.0.0.0:8000'+ form_data.image" id="imageID" height="200" width="200" />
                </div>

                <div class="form-group">
                  <button class="mt-2 btn btn-primary btn-lg float-right">
                    Submit
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
import Master from "../Master";
import axios from "axios";
// import { render } from "vue";
import Swal from "sweetalert2";
// import func from "../../../../vue-temp/vue-editor-bridge";

export default {
  name: "UpdateUser",
  components: { Master },
  data() {
    return {
      form_data: null,
      image: "",
    };
  },
  methods: {
    editUser() {
      const token = localStorage.getItem("token");
      axios
        .put("profiles/me/", {
          headers: {
            Authorization: `token ${token}`,
          },
          // ...this.form_data
          user: {
            username: this.form_data.user.username,
            // email: this.form_data.email,

            first_name: this.form_data.user.first_name,
            last_name: this.form_data.user.last_name,
          },
          phone: this.form_data.phone,
          short_bio: this.form_data.short_bio,
          education: this.form_data.education,
          location: this.form_data.location,
          skills: this.form_data.skills ? this.form_data.skills.split(",") : [],
          image: document.getElementById("imageID").src
          
        })

        .then((response) => {
          Swal.fire({
            icon: "success",
            // title: "Yes...",
            text: "You have successfully edit a user..",
          }).then((response) => {
            this.$router.push({ name: "UserProfile" });
            console.log(response);
          });
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // end of edit

    getUserData: function () {
      axios.get("profiles/me/").then(
        (response) => {
          this.form_data = response.data;
          this.form_data.skills = this.form_data.skills.join();
        },
        (response) => {
          console.log(response);
        }
      );
    },

    handleImage() {
      var files = document.getElementById("file").files;
      if (files.length > 0) {
        // getBase64(files[0]);
        this.getBase64(files[0]);
      }
    },
    getBase64(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        console.log(reader.result);
        document.getElementById("imageID").src = reader.result;
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    },


  },

  created() {
    this.getUserData();
  },
};
</script>

<style scoped>
.vl {
  border: 1px solid #eeeeee;
}

.grp-per {
  height: 135px;
  overflow: scroll;
}
</style>