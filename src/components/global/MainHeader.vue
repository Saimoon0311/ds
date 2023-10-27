<template lang="">
  <div class="text-center  container-hd" >
      <router-link to="/"> 
      <img src="../../assets/images/logo.jpeg" srcset="../../assets/images/logo.jpeg 450w, ../../assets/images/logo.jpeg 600w, ../../assets/images/logo.jpeg 750w" sizes="(min-width: 820px) 446px, (min-width: 640px) 588px, calc(90vw + 30px)" class="img-fluid" />
    </router-link>
    <div class="dropdown cstm-dropdown">
      <button class="btn btn-secondary dropdown-toggle menu-burger" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="fa-solid fa-bars"></i>
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li><router-link class="dropdown-item" to="/about-us">About Us</router-link></li>
          <li><router-link class="dropdown-item" to="/faqs">FAQs</router-link></li>
            <li> <router-link class="dropdown-item" to="/contact-us">Contact Us</router-link></li>

        
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MainHeader'
}
</script>
<style >
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
  margin-top: -15px;
}

.cstm-dropdown button {
  border-radius: 0px;
}

.dropdown-item.active,
.dropdown-item:active {
  background-color: gray !important;
}
</style>