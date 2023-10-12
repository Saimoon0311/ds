<template lang="">
    <div class="hello">
   <AdminHeader />        
    <AdminLawyer />
    </div>



</template>
<script>


import AdminLawyer from './Lawyers.vue'
import AdminHeader from './Header.vue'
export default {

    components: {
        AdminLawyer,
        AdminHeader
    },
    methods: {

    },
    name: 'AdminDashboard',
}
</script>
<style scoped>

.navbar-nav{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
}

.logo-small {
    width: 175px;
    height: 50px;
}

.law-img {
    width: 15vw;
    height: 15vw;
    border: 1px solid white;
    border-radius: 50%;
}

.navActive {
    background: grey;
    border: 1px solid grey;
    border-radius: 10px;
    color: white;
}
.navbar-nav .left-menu{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.bg-grey {
    background: grey;
    color: white;
}

.bg-grey:hover {
    background: grey;
    color: white;
}
</style>