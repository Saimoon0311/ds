<template lang="">
  <div class="hello">
    <header>
      <nav
        class="navbar navbar-expand-lg"
        style="border-bottom: 1px solid lightgrey"
      >
        <div class="container-fluid">
          <a class="navbar-brand" href="">
            <img
              src="../../assets/images/admin-logo.png"
              class="logo-small"
              alt="logo"
            />
          </a>
          <button
            class="navbar-toggler cstm-dropdown"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <img src="../../assets/images/bar.png" alt="" />

            <!-- <span class="navbar-toggler-icon"></span> -->
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <div class="left-menu">
                <!-- client -->
                <router-link
                  to="/client-dashboard"
                  class="nav-link fw-bolder menuItem-active-link"
                  id="lawyers"
                  aria-current="page"
                  >Dashboard</router-link
                >
                <router-link
                  to="/posting-job"
                  class="nav-link fw-bolder menuItem-active-link"
                  id="lawyers"
                  aria-current="page"
                  >Post a Job</router-link
                >

                
                <router-link
                  to="/client-account"
                  class="nav-link fw-bolder menuItem-active-link"
                  id="lawyers"
                  aria-current="page"
                  >Account</router-link
                >

                <router-link
                  to="/client-faqs"
                  class="nav-link fw-bolder menuItem-active-link"
                  id="lawyers"
                  aria-current="page"
                  >FAQs</router-link
                >
                
                <ul class="showonmonb" >
                  <li>
                    <router-link class="nav-link fw-bolder menuItem-active-link" to="/about-us"
                      >About Us</router-link
                    >
                  </li>

                  <!-- <li>
                    <router-link class="nav-link fw-bolder menuItem-active-link" to="/client-faqs"
                      >FAQs</router-link
                    >
                  </li> -->

                  <li>
                    <router-link class="nav-link fw-bolder menuItem-active-link" to="/how-simplawfy-works"
                      >How Simplawfy Works</router-link
                    >
                  </li>

                  <li>
                    <router-link class="nav-link fw-bolder menuItem-active-link" to="/contact-us"
                      >Contact Us</router-link
                    >
                  </li>
                  <li>
                    <button
                      @click="logout('login')"
                      class="nav-link fw-bolder menuItem-active-link"
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
                  <img src="../../assets/images/bar.png" alt="" />
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <router-link class="dropdown-item" to="/about-us"
                      >About Us</router-link
                    >
                  </li>

                  <!-- <li >
                    <router-link class="dropdown-item" to="/client-faqs"
                      >FAQs</router-link
                    >
                  </li> -->
                  

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
    return {};
  },
  components: {},
  methods: {},
  name: "ClientHeader",
};
</script>
<style scoped>
.router-link-exact-active.menuItem-active-link {
  background: rgb(0, 0, 0);
  border: 1px solid rgb(0, 0, 0);
  border-radius: 7px;
  color: white !important;
  padding: 5px 11px;
}

.navbar-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
}

.logo-small {
  width: 175px;
  height: 40px;
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
  border-radius: 10px;
  color: white;
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
}

.bg-grey {
  background: rgb(0, 0, 0);
  color: white;
}

.bg-grey:hover {
  background: rgb(0, 0, 0);
  color: white;
}

.cstm-dropdown {
  border-radius: 0px;
  border: none !important;
}

.cstm-dropdown:focus {
  box-shadow: none !important;
}

.cstm-dropdown img {
  width: 50px;
  margin-top: 15px;
}

ul.dropdown-menu.show {
  left: auto;
  right: 10px;
  margin-top: 10px;
}

.cstm-dropdown {
  border-radius: 0px;
  border: none !important;
  margin-top: -10px;
}

.lg-btn button {
  color: #000000a6 !important;
  font-weight: 400: bolder;
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
    flex-direction: column;
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
}

@media only screen and (max-width: 991px) {
  .custom-dropdown {
    display: none;
  }

  .showonmonb {
    display: block;
  }
}

@media only screen and (max-width: 767px) and (min-width: 320px) {
  .navbar-nav {
    align-items: baseline;
  }

  .navbar-nav .left-menu {
    display: flex;
    align-items: baseline;
    flex-direction: column;
    flex-wrap: wrap;
  }

  .navbar-nav .lg-btn {
    /* padding: 0px 22px; */
  }

  .router-link-exact-active.menuItem-active-link {
    padding: 7px 10px;
  }

  .pb-seven {
    padding-bottom: 200px;
  }
}</style>
