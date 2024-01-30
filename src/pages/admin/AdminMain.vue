<template lang="">
  <div class="hello">
    <AdminHeader />
    <div class="main pb-4">
      <div class="container">
        <div class="row pt-3">
          <div class="col-md-6 col-lg-3 col-sm-12">
            <div class="admin-card p-3 mb-2">
              <div
                class="d-flex flex-wrap justify-content-between align-items-center"
              >
                <h6 class="text-black">Total Revenue</h6>
                <i
                  class="fa fa-money-bill rounded-circle p-2 bg-dark text-white"
                ></i>
              </div>
              <p class="text-black m-0">${{ this.formatNumber(revenue) }}</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-3 col-sm-12">
            <div class="admin-card p-3 mb-2">
              <div
                class="d-flex flex-wrap justify-content-between align-items-center"
              >
                <h6 class="text-black">Total Lawyers</h6>
                <i
                  class="fa fa-scale-balanced rounded-circle p-2 bg-dark text-white"
                ></i>
              </div>
              <p class="text-black m-0">{{ lawyers }}</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-3 col-sm-12">
            <div class="admin-card p-3 mb-2">
              <div
                class="d-flex flex-wrap justify-content-between align-items-center"
              >
                <h6 class="text-black">Total Clients</h6>
                <i
                  class="fa fa-mug-hot rounded-circle p-2 bg-dark text-white"
                ></i>
              </div>
              <p class="text-black m-0">{{ clients }}</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-3 col-sm-12">
            <div class="admin-card p-3 mb-2">
              <div
                class="d-flex flex-wrap justify-content-between align-items-center"
              >
                <h6 class="text-black">Total Jobs</h6>
                <i class="fa fa-book rounded-circle p-2 bg-dark text-white"></i>
              </div>
              <p class="text-black m-0">{{ jobs }}</p>
            </div>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-md-6 col-lg-3 col-sm-12">
            <h5 class="mt-md-2 mb-md-4 mt-sm-2 mb-sm-3">Daily Signups</h5>
            <div class="table-responsive">

            
            <table class="table table-striped" v-if="todaySignup.length > 0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(user,index) in todaySignup" :key="index">
                  <td>{{ user?.first_name }} {{ user?.last_name}}</td>
                  <td>{{ user?.email }}</td>
                </tr>
              </tbody>
            </table>
            <p v-else>No Record Found!</p>
        
          </div>
          </div>
          <div class="col-md-6 col-lg-6 col-sm-12">
            <div class="mb-2">
              <!-- <apexcharts  :options="lineChartOptions" :series="lineseries"></apexcharts> -->
              <apexcharts
                :options="pieChartOptions"
                :series="pieseries"
              ></apexcharts>
            </div>
          </div>
          <div class="col-md-6 col-lg-3 col-sm-12">
            <div class="admin-card p-3 mb-md-3 mb-sm-2 ">
              <div
                class="d-flex flex-wrap justify-content-between align-items-center"
              >
                <h6 class="text-black">Outstanding Jobs</h6>
                <i
                  class="fa fa-book rounded-circle p-2 bg-dark text-white"
                ></i>
              </div>
              <p class="text-black m-0">{{ outstandingJobs }}</p>
            </div>
            <div class="admin-card p-3 mb-md-3 mb-sm-2">
              <div
                class="d-flex flex-wrap justify-content-between align-items-center"
              >
                <h6 class="text-black">Global Merchandise Value (GMV)</h6>
                <i
                  class="fa fa-money-bill rounded-circle p-2 bg-dark text-white"
                ></i>
              </div>
              <p class="text-black m-0">${{ this.formatNumber(proposals) }}</p>
            </div>
            <div class="admin-card p-3 mb-md-3 mb-sm-2 bg-success">
              <div
                class="d-flex flex-wrap justify-content-between align-items-center"
              >
                <h6 class="text-white">Subscribed Users</h6>
                <i
                  class="fa fa-users rounded-circle p-2 bg-white text-black"
                ></i>
              </div>
              <p class="text-white m-0">{{ subscribers }}</p>
            </div>
            <div class="admin-card p-3 mb-md-3 mb-sm-2 bg-danger">
              <div
                class="d-flex flex-wrap justify-content-between align-items-center"
              >
                <h6 class="text-white">Free Users</h6>
                <i
                  class="fa fa-users rounded-circle p-2 bg-white text-black"
                ></i>
              </div>
              <p class="text-white m-0">{{ nonsubscribers }}</p>
            </div>
            
          </div>
        </div>

        <!-- <div class="row mt-3">
            <div class="col-md-3 col-sm-12 d-flex flex-column justify-content-end">
                <div class="admin-card p-3 mb-sm-3 mb-2 m-sm-0 bg-success">
                    <div class="d-flex flex-wrap justify-content-between align-items-center">
                        <h6 class="text-white">Subscribed Users </h6>
                         <i class="fa fa-users rounded-circle p-2 bg-dark text-white"></i>   
                    </div>
                    <p class="text-white m-0">55</p>
                </div>
                <div class="admin-card p-3 mb-sm-3 mb-lg-0 m-sm-0 bg-danger">
                    <div class="d-flex flex-wrap justify-content-between align-items-center">
                        <h6 class="text-white">Unsubscribe Users </h6>
                         <i class="fa fa-users rounded-circle p-2 bg-dark text-white"></i>   
                    </div>
                    <p class="text-white m-0">100</p>
                </div>
            </div>
            <div class="col-md-1 col-sm-12">
            </div>
           
            <div class="col-md-4 col-sm-12">
                <apexcharts width="100%" type="bar" :options="chartOptions" :series="series"></apexcharts>
            </div>
            <div class="col-md-4 col-sm-12">
                <apexcharts  :options="pieChartOptions" :series="pieseries"></apexcharts>
                <apexcharts  :options="lineChartOptions" :series="lineseries"></apexcharts>
            </div>
        </div> -->

        <!-- <div class="row mt-3">
            <div class="col-md-4 col-sm-12 ">
                <h5 class="mt-md-4 mb-md-4 mt-sm-2 mb-sm-3">Blocked Users</h5>
                <table  class="table table-striped">
                    <thead>
                        <tr>
                      <th>                      
                       User Name
                      </th>
                      <th>                      
                        Status
                      </th>
                    </tr>
                    </thead>
                  <tbody>
                    
                    <tr>
                        <td>
                            Adam Jay
                        </td>
                        <td>
                            Blocked
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Adam Jay
                        </td>
                        <td>
                            Blocked
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Adam Jay
                        </td>
                        <td>
                            Blocked
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Adam Jay
                        </td>
                        <td>
                            Blocked
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Adam Jay
                        </td>
                        <td>
                            Blocked
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Adam Jay
                        </td>
                        <td>
                            Blocked
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Adam Jay
                        </td>
                        <td>
                            Blocked
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Adam Jay
                        </td>
                        <td>
                            Blocked
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Adam Jay
                        </td>
                        <td>
                            Blocked
                        </td>
                    </tr>
                  </tbody>
                </table>
               
               
            </div>
         
            <div class="col-md-8 col-sm-12">
                <div class="row">
                    <div class="col-md-12 col-lg-6 col-sm-12">
                        <div class="admin-card p-3  mb-2  bg-success">
                    <div class="d-flex flex-wrap justify-content-between align-items-center">
                        <h6 class="text-white">Subscribed Users </h6>
                         <i class="fa fa-users rounded-circle p-2 bg-white text-black"></i>   
                    </div>
                    <p class="text-white m-0">{{ subscribers }}</p>
                </div>
                    </div>
                    <div class="col-md-12 col-lg-6 col-sm-12">  
                        <div class="admin-card p-3  mb-2  bg-danger">
                    <div class="d-flex flex-wrap justify-content-between align-items-center">
                        <h6 class="text-white">Free Users </h6>
                         <i class="fa fa-users rounded-circle p-2 bg-white text-black"></i>   
                    </div>
                    <p class="text-white m-0">{{ nonsubscribers }}</p>
                </div>
                    </div>
                </div> 
                <div class="mt-2">
               -->
      </div>
    </div>
    <div class="footer">
      <MainFooter />
    </div>
  </div>
</template>
<script>
import AdminHeader from "./Header.vue";
import MainFooter from "../../components/global/MainFooter.vue";
import VueApexCharts from "vue3-apexcharts";
import api from "@/config/api";
import $ from "jquery";
window.$ = window.jQuery = $;
export default {
  components: {
    AdminHeader,
    MainFooter,
    apexcharts: VueApexCharts,
  },

  data() {
    return {
      outstandingJobs : 0,
      revenue: null,
      lawyers: null,
      clients: null,
      subscribers: null,
      nonsubscribers: null,
      cancelSubscription: null,
      jobs: null,
      proposals: null,
      subscription_percent: null,
      cancelations_percent: null,
      todaySignup : [],
      chartOptions: {
        chart: {
          // id: 'vuechart-example',
          // id
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
          ],
        },
      },

      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 81],
        },
      ],
      lineseries: [
        {
          name: "Revenue",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        },
      ],

      pieseries: [0, 0, 0],
      pieChartOptions: {
        chart: {
          width: 300,
          type: "pie",
        },
        labels: ["Subscribed Users", "Unsubscribed Users","Free Users"],
      },

      lineChartOptions: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        title: {
          text: "Monthly Revenue",
          align: "left",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
          ],
        },
      },

      pageStatus: "pending",
      // openJobs: [],
      endpoint: "/admin/all-lawyers",
      // endpoint_search: "/lawyer/search-related-jobs",

      form: {
        law_firm: null,
        link: null,
        phone: null,
        about: null,
        job_title: null,
        consultation_type: "free",
        consultation_time: null,
        consultation_amount: null,
        remote_consultation: false,
        mobile_friendly: false,
        user_id: null,
      },

      options: [],
      selectedOptionIds: [],
      selectedOptionIdsShow: [],

      options_locations: [],
      selectedOptionIds_locations: [],
      selectedOptionIdsShow_locations: [],
    };
  },

  watch: {
    pageStatus(newQuery) {
      console.log("pageStatus : ", newQuery);
    },
  },

  computed: {
    userName() {
      return `${this.$store.getters?.loginUser?.first_name} ${this.$store.getters?.loginUser?.last_name}`;
    },
    adminApproval() {
      return this.$store.getters.adminApprovalStatus;
    },
    subscriptionStatus() {
      console.log("ss tt uu : ", this.$store.getters.subscriptionStatus);
      return this.$store.getters.subscriptionStatus;
    },
  },
  async created() {
    await this.loadMore(this.pageStatus);
    this.getData();
  },

  methods: {
    getData() {
      api
        .get("/admin/dashboard-data")
        .then((res) => {
          console.log("dashboard data : ", res?.data);
          this.outstandingJobs= res?.data?.outstandingJobs;
          this.revenue = res?.data?.revenue;
          this.lawyers = res?.data?.lawyers;
          this.clients = res?.data?.clients;
          this.subscribers = res?.data?.subscribers;
          this.nonsubscribers = res?.data?.nonsubscribers;
          this.cancelSubscription = res?.data?.cancelSubscription;
          this.todaySignup = res?.data?.todaySignup;
          const sub_data_total = this.subscribers + this.cancelSubscription + this.nonsubscribers;
          
          this.subscription_percent = (this.subscribers / sub_data_total) * 100;
          this.cancelations_percent =
            (this.cancelSubscription / sub_data_total) * 100;
            this.subscription_percent = (this.subscribers / sub_data_total) * 100;

          this.pieseries[0] = this.subscription_percent;
          this.pieseries[1] = this.cancelations_percent;
          this.pieseries[2] = this.nonsubscribers;

          console.log('pei pie : ' , this.pieseries);
          console.log(sub_data_total);
          
          this.jobs = res?.data?.jobs;
          this.proposals = res?.data?.proposals;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateChart() {
      const max = 90;
      const min = 20;
      const newData = this.series[0].data.map(() => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      });
      // In the same way, update the series option
      this.series = [
        {
          data: newData,
        },
      ];
    },
    setModalData(keyName, value, user_id) {
      // if (Array.isArray(keyName)) {
      //   keyName.forEach(element => {
      //     if (this.form[element] != null && this.form[element] !== "") {
      //       form[element] = this.form[element];
      //     }
      //   });
      // } else {
      this.form[keyName] = value;
      // }
      this.form.user_id = user_id;
      console.log(this.form);
    },

    setModal(type, user_id) {
      this.form.user_id = user_id;
      if (type == "fields") {
        this.fetchOptions();
        this.selectedOptionIds = this.selectedOptionIdsShow;
        console.log("idssss ::::: ", this.selectedOptionIdsShow);
      } else if (type == "locations") {
        this.fetchOptions_locations();
        this.selectedOptionIds_locations = this.selectedOptionIdsShow_locations;
      }
    },

    async fetchOptions() {
      try {
        const response = await api.get(
          `/get-active-fields?user_id=${this.form.user_id}`
        );
        console.log(
          "sundak  :::: ",
          this.form.user_id,
          response?.data?.myFields
        );
        this.options = response?.data?.allFields;
        this.selectedOptionIds = response?.data?.myFields ?? [];
        this.selectedOptionIdsShow = response?.data?.myFields ?? [];
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    },

    // locations
    async fetchOptions_locations() {
      try {
        const response = await api.get(
          `/get-active-locations?user_id=${this.form.user_id}`
        );
        console.log("sundak  :::: ", response?.data);
        this.options_locations = response?.data?.allLocations;
        this.selectedOptionIds_locations = response?.data?.myLocations ?? [];
        this.selectedOptionIdsShow_locations =
          response?.data?.myLocations ?? [];
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    },

    // fields
    saveSelectedFields(user_id, index) {
      console.log("Selected Option IDs:", this.selectedOptionIds);
      if (this.selectedOptionIds.length == 0) {
        return false;
      }
      try {
        api
          .post("/admin/update-fields", {
            user_id: user_id,
            ids: this.selectedOptionIds,
            is_admin: true,
          })
          .then((res) => {
            this.$swal("", "Fields updated successfully", "success");
            this.closeModal(`#AreaModal${index}`);
            if (this.openJobs.length > 0) {
              const openJobsIndex = this.openJobs.findIndex(
                (user) => user.email === res?.data?.data?.email
              );
              if (openJobsIndex !== -1) {
                this.openJobs[openJobsIndex].fields = [
                  ...this.selectedOptionIds,
                ];
              }
            }

            //       this.fetchOptions();
            // this.fetchUserData();
          })
          .catch((error) =>
            this.$swal("", error?.response?.data?.error, "error")
          );
      } catch (error) {
        this.$swal("", error?.response?.data?.error, "error");
        // console.error('Error uploading image', error);
      }
    },

    // locations
    saveSelectedLocations(user_id, index) {
      console.log("Selected Option IDs:", this.selectedOptionIds_locations);
      if (this.selectedOptionIds_locations.length == 0) {
        return false;
      }
      try {
        api
          .post("/admin/update-locations", {
            user_id: user_id,
            ids: this.selectedOptionIds_locations,
            is_admin: true,
          })
          .then((res) => {
            this.$swal("", "Locations updated successfully", "success");
            // this.fetchOptions_locations();
            // this.fetchUserData();
            this.closeModal(`#StateModal${index}`);
            console.log("loc ::::: ", this.openJobs);
            if (this.openJobs.length > 0) {
              console.log("index ::::: ", this.openJobs);
              console.log("index ::::: ", res);
              const openJobsIndex = this.openJobs.findIndex(
                (user) => user.email === res?.data?.data?.email
              );
              if (openJobsIndex !== -1) {
                this.openJobs[openJobsIndex].locations = [
                  ...this.selectedOptionIds_locations,
                ];
              }
            }
          })
          .catch((error) =>
            this.$swal("", error?.response?.data?.error, "error")
          );
      } catch (error) {
        this.$swal("", error?.response?.data?.error, "error");
        // console.error('Error uploading image', error);
      }
    },

    async setStatus(status) {
      this.pageStatus = status;
      await this.loadMore(status, true);
    },
    approve(id, index) {
      try {
        this.$swal({
          title: "Are you sure?",
          text: `Are you sure you want to approve this lawyer profile ?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: `Yes, Approve`,
        }).then((result) => {
          if (result.isConfirmed) {
            api
              .post("/admin/approve-reject-users", {
                user_id: id,
                status: "approve",
              })
              .then(() => {
                this.$swal("", `This lawyer is now approved.`, "success").then(
                  async () => {
                    this.fixLoadMoreAfterDeleteRecord(index, this.pageStatus);
                  }
                );
              })
              .catch((error) => {
                console.log("error : ", error);
              });
          }
        });
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    },

    reject(id, index) {
      console.log(id, index);

      this.$swal
        .fire({
          title: "Type reason here:",
          input: "text",
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: true,
          confirmButtonText: "Submit",
          showLoaderOnConfirm: true,
          preConfirm: async (inputValue) => {
            try {
              // Call your API here
              const response = await api.post("/admin/approve-reject-users", {
                user_id: id,
                status: "reject",
                reason: inputValue,
              });

              // Handle the API response as needed
              console.log("API Response:", response.data);

              // Return the input value if needed
              return inputValue;
            } catch (error) {
              // Handle API errors
              console.error("API Error:", error);

              // Show an error message in SweetAlert2
              this.$swal.showValidationMessage("API Error");
            }
          },
          allowOutsideClick: () => !this.$swal.isLoading(),
        })
        .then((result) => {
          if (result.isConfirmed) {
            if (result.isConfirmed) {
              this.$swal(
                "",
                `Lawyer has been rejected successfully`,
                "success"
              ).then(async () => {
                this.fixLoadMoreAfterDeleteRecord(index, this.pageStatus);
              });
            }

            // Do something with the input value
            // Swal.fire(`You entered: ${result.value}`);
          }
        });
    },

    closeModal(modalId) {
      $(modalId).modal("hide");
    },
  },
  name: "AdminLawyer",
};
</script>
<style scoped>
h6 {
  font-weight: 500;
}

.admin-card,
.vue-apexcharts,
table {
  border-radius: 5px 5px;
  /* background: rgba(55, 59, 62, 1); */
  box-shadow: 5px 5px 20px #00000017;
}

ul#pills-tab {
  text-align: center;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  width: 330px;
}

/* .hello {} */
.hello {
  min-height: 100vh;
  position: relative;
  padding-bottom: 60px;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: white;
  background-color: #000000;
}

.nav-pills .nav-link,
.nav-link:focus,
.nav-link:hover {
  color: #000000;
}

.text-left {
  text-align: left;
}

.button-width {
  width: 12%;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}

table th {
  font-weight: 600;
}
@media only screen and (max-width: 1199px) and (min-width: 767px)  {
h6{
  font-size: 13px;
}
i.fa{
  font-size: 12px;
}
td, th {
    font-size: 14px;
}
}
</style>
