<template lang="">
  <div class="text-center pt-4 container mobile-layout" >
      <router-link to="/"> 
      <img src="../assets/images/logo.jpeg" srcset="../assets/images/logo.jpeg 450w, ../assets/images/logo.jpeg 600w, ../assets/images/logo.jpeg 750w" sizes="(min-width: 820px) 446px, (min-width: 640px) 588px, calc(90vw + 30px)" class="img-fluid" />
    </router-link>
    <div class="dropdown cstm-dropdown">
      <button class="btn btn-secondary dropdown-toggle menu-burger" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        <!-- <i class="fa-solid fa-bars"></i> -->
        <img src="../assets/images/bar.png" alt="">

      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li><router-link class="dropdown-item" to="/about-us">About Us</router-link></li>
        
        <li v-if="loginUser != null && loginUser?.type == 'client' "><router-link class="dropdown-item" to="/client-faqs" >FAQs</router-link></li>
        <li v-if="loginUser != null && loginUser?.type == 'lawyer' "><router-link class="dropdown-item" to="/lawyer-faqs"  >FAQs</router-link></li>

        <li v-if="loginUser != null && loginUser?.type == 'client' "><router-link class="dropdown-item" to="/how-simplawfy-works-clients">How Simplawfy Works</router-link></li>
        <li v-if="loginUser != null && loginUser?.type == 'lawyer' "><router-link class="dropdown-item" to="/how-simplawfy-works-lawyers">How Simplawfy Works</router-link></li>

        <li> <router-link class="dropdown-item" to="/contact-us">Contact Us</router-link></li>

        
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'GeneralHeader',
  computed: {
    loginUser() {
      // console.log("asdasd", this.$store.getters.loginUser)
      return this.$store.getters.loginUser;
    }
  }
}

</script>
<style >
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
  margin-top: -80px;
}

.cstm-dropdown button {
  border-radius: 0px;
  border: none !important
}

.cstm-dropdown button:focus {
  box-shadow: none !important
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
  color: #000
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
}

@media (min-width: 425px) and (max-width: 767px) {
  .cstm-dropdown {
    margin-top: -32px;
    right: 20px;
  }

  .mobile-layout {
    display: flex;
    justify-content: center;
    align-items: center;
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

}
</style>