<template lang="">
  <div class="hello">
    <header>
      <nav
        class="navbar navbar-expand-lg"
        style="border-bottom: 1px solid lightgrey"
      >
        <div class="container-fluid">
            <router-link
            class="navbar-brand"
                  to="/lawyer-dashboard">
            <img
              src="../../assets/images/new-logo.png"
              class="logo-small"
              alt="logo"
            />
          </router-link>
          <button
            class="navbar-toggler cstm-dropdown"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <img src="../../assets/images/menu.svg" alt="" />
            <span class="countmsg header-count" v-if="noti_msg && noti_msg > 0">{{ noti_msg }}</span>
            <!-- <span class="countmsg header-count">1</span> -->
          </button>
          
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <div class="left-menu">
                <router-link
                  to="/lawyer-dashboard"
                  class="nav-link fw-normal menuItem-active-link"
                  id="lawyers"
                  aria-current="page"
                  >Dashboard</router-link
                >
                <!-- <router-link
                  to="/lawyer-proposals"
                  class="nav-link fw-normal menuItem-active-link"
                  id="lawyers"
                  aria-current="page"
                  >Proposals</router-link
                > -->
                 
                <!-- class="nav-link fw-normal menuItem-active-link" -->
                <!-- <button
                :class="{ 'nav-link': true, 'fw-normal': true, 'menuItem-active-link': $route.path === '/messages-history', 'router-link-active': $route.path === '/messages-history', 'router-link-exact-active': $route.path === '/messages-history' }"
                  id="jobs"
                  aria-current="page"
                  @click="goToChatsPage()"
                  >Messages</button> -->

                <router-link
                  v-if="loginUserData"
                  to="/messages-history"
                  class="nav-link fw-normal menuItem-active-link"
                  id="lawyers"
                  aria-current="page"
                  >Messages
                    <span class="countmsg" v-if="noti_msg && noti_msg > 0">{{ noti_msg }}</span>
                  </router-link
                >

                <router-link
                  to="/lawyer-profile"
                  class="nav-link fw-normal menuItem-active-link"
                  id="jobs"
                  aria-current="page"
                  >Profile</router-link
                >
                <router-link
                  to="/lawyer-account"
                  class="nav-link fw-normal menuItem-active-link"
                  id="jobs"
                  aria-current="page"
                  >Account</router-link
                >
                <router-link
                  to="/lawyer-faqs"
                  class="nav-link fw-normal menuItem-active-link"
                  id="jobs"
                  aria-current="page"
                  >FAQs</router-link
                >
           
                
                
                <ul class="showonmonb">
                  <li>
                    <router-link class="nav-link fw-normal menuItem-active-link" to="/about-us"
                      >About Us</router-link
                    >
                  </li>

                  <li>
                    <router-link class="nav-link fw-normal menuItem-active-link" to="/how-simplawfy-works"
                      >How Simplawfy Works</router-link
                    >
                  </li>

                  <li>
                    <router-link class="nav-link fw-normal menuItem-active-link" to="/contact-us"
                      >Contact Us</router-link
                    >
                  </li>
                  <li>
                    <button
                  @click="logout('login')"
                  class="nav-link fw-normal menuItem-active-link"
                  id="clients"
                  aria-current="page"
                >
                  Logout
                </button>
                  </li>
                </ul>
                
                
              </div>

              <div class="dropdown cstm-dropdown custom-dropdown">
                <button
                  class="btn btn-secondary dropdown-toggle menu-burger"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <!-- <i class="fa-solid fa-bars"></i> -->
                  <img src="../../assets/images/menu.svg" alt="" />
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <router-link class="dropdown-item" to="/about-us"
                      >About Us</router-link
                    >
                  </li>

                  <li>
                    <router-link class="dropdown-item" to="/how-simplawfy-works"
                      >How Simplawfy Works</router-link
                    >
                  </li>

                  <li>
                    <router-link class="dropdown-item" to="/contact-us"
                      >Contact Us</router-link
                    >
                  </li>
                  <li>
                    <button
                  @click="logout('login')"
                  class="dropdown-item"
                  id="clients"
                  aria-current="page"
                >
                  Logout
                </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isMobileScreen: false,
      screenWidth: window.innerWidth,
    }
  },
  computed: {
    noti_msg() {
      // console.log('no : ', this.$store.state.noti_count_msg);
      return this.$store.state.noti_count_msg;
    },
    loginUserData() {
      return this.$store.getters?.loginUser;
    }
  },
  components: {},

  mounted() {
    // Run the function initially
    this.runFunctionIfMobile();

    // Add an event listener to update dimensions and run the function on window resize
    window.addEventListener('resize', this.updateDimensions);
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  },

  methods: {
    updateDimensions() {
      // console.log('reun');
      this.screenWidth = window.innerWidth;
      this.runFunctionIfMobile();
    },

    runFunctionIfMobile() {
      if (window.innerWidth <= 991) {
        this.isMobileScreen = true;
        // console.log('Running function for mobile ', this.isMobileScreen);
      }
    },
  },
  name: "LawyerHeader",
};
</script>
<style scoped>
.router-link-exact-active.menuItem-active-link {
  background: rgb(0, 0, 0);
  border: 1px solid rgb(0, 0, 0);
  border-radius: 10px;
  color: white !important;
  padding: 5px 11px;
}

.cstm-dropdown {
  border-radius: 0px;
  border: none !important;
  margin-top: -10px;
}

ul.dropdown-menu.show {
  left: auto;
  right: 10px;
  margin-top: 10px;
}

.cstm-dropdown:focus {
  box-shadow: none !important;
}

.cstm-dropdown img {
  width: 45px;
  margin-top: 10px;
}

.navbar-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
}

.logo-small {
  width: 185px;
    height: 40px;
    object-fit: contain;
}

.law-img {
  width: 15vw;
  height: 15vw;
  border: 1px solid white;
  border-radius: 50%;
}

.navActive {
  background: rgb(0, 0, 0);
  border: 1px solid rgb(0, 0, 0);
  border-radius: 7px;
  color: white !important;
}

.navbar-nav .left-menu {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.navbar-nav .left-menu a.nav-link:hover {
  color: #606060;
}

.navbar-nav .left-menu a.nav-link {
  color: black;
  position: relative;
}

.navbar-nav .left-menu button.nav-link:hover {
  color: #606060;
}

.navbar-nav .left-menu button.nav-link {
  color: black;
}


.bg-grey {
  background: rgb(0, 0, 0);
  color: white;
}

.bg-grey:hover {
  background: rgb(0, 0, 0);
  color: white;
}

.lg-btn button {
  color: #000000a6 !important;
  font-weight: 400;
}

.showonmonb {
  display: none;
}

ul.showonmonb {
  list-style: none;
  padding: 0;
  margin: 0;
}

@media only screen and (max-width: 1024px) {

  .cstm-dropdown {
    margin-top: 0;
    top: 0;
  }

  .navbar-nav {
    align-items: baseline;
  }

  .navbar-nav .left-menu {
    display: flex;
    align-items: baseline;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .navbar-nav .lg-btn {
    /* padding: 0px 22px; */
  }

  .router-link-exact-active.menuItem-active-link {
    padding: 7px 10px;
  }

  .logOutBtn {
    width: 109px;
    text-align: left;
  }

  .cstm-dropdown img {
    width: 45px;
    margin-top: 0px;
  }
}

@media only screen and (max-width: 991px) {
  span.header-count {
    top: 10px !important;
    right: 4px !important;
    line-height: 1.2;
    font-size: 12px;
  }

  .custom-dropdown {
    display: none;
  }

  .navbar-nav .left-menu {
    flex-direction: column;
  }

  .showonmonb {
    display: block;
  }
}

@media only screen and (max-width: 767px) and (min-width: 320px) {
  .pb-seven {
    padding-bottom: 200px;
  }

  .cstm-dropdown img {
    margin-top: 0;
  }
}</style>
