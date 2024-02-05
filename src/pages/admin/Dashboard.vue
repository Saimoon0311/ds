<template lang="">
    <div class="admin-d">
        <AdminHeader />        

        <AdminLawyer />
        <div class="footer">
            <MainFooter />
        </div>
    </div>
</template>
<script>


// import GeneralHeader from '../GeneralHeader.vue'
import MainFooter from "../../components/global/MainFooter.vue";

import AdminHeader from './Header.vue'
import AdminLawyer from './Lawyers.vue'
export default {

    components: {
        AdminLawyer,
        AdminHeader,
        MainFooter
    },
    methods: {

    },
    name: 'AdminDashboard',
}
</script>
<style scoped>
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
    border-radius: 10px;
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

.nav-pills .nav-link.active,
.nav-pills .show>.nav-link {
    color: white;
    background-color: #000000;
}

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
</style>