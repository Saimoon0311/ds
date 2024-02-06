<template lang="">
  <div class="text-center  container-hd" >
    <router-link to="/"> 
      <img  src="../../assets/images/new-logo.png" srcset="../../assets/images/new-logo.png 450w, ../../assets/images/new-logo.png 600w, ../../assets/images/new-logo.png 750w" sizes="(min-width: 820px) 446px, (min-width: 640px) 588px, calc(90vw + 30px)" class="img-fluid main-lg-img" />
    </router-link>
    <div class="dropdown cstm-dropdown">
      <button class="btn btn-secondary dropdown-toggle menu-burger" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        <!-- <i class="fa-solid fa-bars"></i> -->
        <img src="../../assets/images/bar.png" alt="">
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li><router-link class="dropdown-item" to="/about-us">About Us</router-link></li>
        <li><router-link class="dropdown-item" to="/client-faqs">Client FAQs</router-link></li>
        <li><router-link class="dropdown-item" to="/lawyer-faqs">Lawyer FAQs</router-link></li>
        <li> <router-link class="dropdown-item" to="/contact-us">Contact Us</router-link></li>
        <li> <router-link class="dropdown-item" to="/login">Login</router-link></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MainHeader'
}
</script>
<style scoped>
.menu-burger:after {
  display: none !important;
}

.container-hd {
  max-width: 1040px;
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
  margin-top: -20px;
}

.cstm-dropdown button {
  border-radius: 0px;
  border: none !important
}

.cstm-dropdown button img {
  width: 50px;
}

.cstm-dropdown button:focus {
  box-shadow: none !important
}

.dropdown-item.active,
.dropdown-item:active {
  background-color: gray !important;
}

@media (min-width: 768px) and (max-width: 1024px) {
  .cstm-dropdown {
    margin-top: -26px;
    right: 20px;
  }
}

@media (min-width: 425px) and (max-width: 767px) {
  .cstm-dropdown {
    margin-top: -32px;
    right: 20px;
  }
}

@media (min-width: 320px) and (max-width: 425px) {
  .cstm-dropdown {
    position: relative !important;
    margin-top: -18px;
    right: -10px;
  }

  .main-lg-img {
    margin-left: -13px;
  }

  .terms-check input {
    float: left;
  }

  .tac {
    float: left;
    width: 80%;
    margin-top: -4px;

  }

  .tac a {
    display: inline-block;
  }

}
</style>