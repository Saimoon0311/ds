<template lang="">
  <div class="text-center pt-4 container mobile-layout">
    <router-link to="/" class="main-logo">
      <img src="../assets/images/new-main.png" class="img-fluid" />
    </router-link>
    <div class="dropdown cstm-dropdown">
      <button
        class="btn btn-secondary dropdown-toggle menu-burger"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <!-- <i class="fa-solid fa-bars"></i> -->
        <img src="../assets/images/menu.svg" alt="" />
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li>
          <router-link class="dropdown-item" to="/about-us"
            >About Us</router-link
          >
        </li>

        <li v-if="loginUser != null && loginUser?.type === 'client'">
          <router-link class="dropdown-item" to="/client-faqs"
            >FAQs</router-link
          >
        </li>
        <li v-if="loginUser != null && loginUser?.type === 'lawyer'">
          <router-link class="dropdown-item" to="/lawyer-faqs"
            >FAQs</router-link
          >
        </li>

        <li >
          <router-link class="dropdown-item" to="/how-simplawfy-works"
            >How Simplawfy Works</router-link
          >
        </li>
        

        <li>
          <router-link class="dropdown-item" to="/contact-us"
            >Contact Us</router-link
          >
        </li>

        <li> <router-link class="dropdown-item" to="/login">Login</router-link></li>
        
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "GeneralHeader",
  computed: {
    loginUser() {
      // console.log("asdasd", this.$store.getters.loginUser)
      return this.$store.getters.loginUser;
    },
  },
};
</script>
<style>
.main-logo img {
  width: 20%;
}

.menu-burger:after {
  display: none !important;
}

.container {
  position: relative;
}

.container-hd {
  /* max-width: 1040px; */
  margin: 0px auto !important;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: relative;
}

.cstm-dropdown {
  position: absolute !important;
  right: 0;
  margin-top: -100px;
}

.cstm-dropdown button {
  border-radius: 0px;
  border: none !important;
}

.cstm-dropdown button:focus {
  box-shadow: none !important;
}

.cstm-dropdown button img {
  width: 50px;
}

.dropdown-item.active,
.dropdown-item:active {
  background-color: #000 !important;
}

.menu-burger {
  background: #fff !important;
}

.menu-burger:focus {
  box-shadow: none;
}

.menu-burger i {
  color: #000;
}

@media (min-width: 768px) and (max-width: 1024px) {
  .cstm-dropdown {
    margin-top: -26px;
    right: 20px;
  }

  .mobile-layout {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .main-logo img {
    width: 40%;
  }
}

@media (min-width: 425px) and (max-width: 767px) {
  .cstm-dropdown {
    margin-top: -32px;
    right: 5px;
  }

  .mobile-layout {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .main-logo {
    text-align: left;
  }

  .main-logo img {
    width: 50%;
    margin-left: 20px;
}
}

@media (min-width: 320px) and (max-width: 425px) {
  .cstm-dropdown {
    position: relative !important;
    margin-top: -18px;
    right: -10px;
  }

  .mobile-layout {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .main-logo {
    text-align: left;
  }

  .main-logo img {
    width: 55%;
    margin-left: 10px;
}
}
</style>
