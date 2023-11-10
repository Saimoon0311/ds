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
            <img src="../../assets/images/bar.png" alt="">

            <!-- <span class="navbar-toggler-icon"></span> -->
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <div class="left-menu">
                <router-link
                  to="/lawyer-dashboard"
                  class="nav-link fw-bolder menuItem-active-link"
                  id="lawyers"
                  aria-current="page"
                  >Dashboard</router-link
                >
                <router-link
                  to="/lawyer-proposals"
                  class="nav-link fw-bolder menuItem-active-link"
                  id="lawyers"
                  aria-current="page"
                  >Proposals</router-link
                >
                  
                <router-link
                  to="/lawyer-account"
                  class="nav-link fw-bolder menuItem-active-link"
                  id="jobs"
                  aria-current="page"
                  >Account</router-link
                >
                <router-link
                  to="/lawyer-profile"
                  class="nav-link fw-bolder menuItem-active-link"
                  id="jobs"
                  aria-current="page"
                  >Profile</router-link
                >
              </div>
              <div>
                <button
                  @click="logout('lawyer-login')"
                  class="nav-link float-right logOutBtn  fw-bolder"
                  id="clients"
                  aria-current="page"
                  >Logout</button>
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
  components: {},
  methods: {
  },
  name: "LawyerHeader",
};
</script>
<style scoped>
.router-link-exact-active.menuItem-active-link {
  background: rgb(0, 0, 0);
  border: 1px solid rgb(0, 0, 0);
  border-radius: 10px;
  color: white;
  padding: 5px 11px;

}

.cstm-dropdown {
  border-radius: 0px;
  border: none !important
}

.cstm-dropdown:focus {
  box-shadow: none !important
}

.cstm-dropdown img {
  width: 50px;
  margin-top: 15px;
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
  border-radius: 7px;
  color: white;
}

.navbar-nav .left-menu {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.bg-grey {
  background: rgb(0, 0, 0);
  color: white;
}

.bg-grey:hover {
  background: rgb(0, 0, 0);
  color: white;
}
@media only screen and (max-width: 1024px){
  .cstm-dropdown{
    margin-top: 0;
    top: 0;
  }
  .navbar-nav {
    align-items: baseline;
  }

  .navbar-nav .left-menu {
    display: flex;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
  }

  .navbar-nav .lg-btn {
    padding: 0px 22px;
  }

  .router-link-exact-active.menuItem-active-link {
    padding: 7px 10px;
  }
  .logOutBtn{
    width: 109px;
  }
}
@media only screen and (max-width: 767px) and (min-width: 320px) {


  .pb-seven {
    padding-bottom: 200px;
  }
  
}
</style>
