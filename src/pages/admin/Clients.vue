
<template lang="">
    <div class="hello">
        <AdminHeader />   

        <main class="container my-3">
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                <tr><td colspan="2" class="text-center">No clients have been signed up yet</td></tr>            </tbody>
        </table>
    </main>

        
    </div>



</template>
<script>

import AdminHeader from './Header.vue'


export default {

    components: {
        AdminHeader
    },
    methods: {

    },
    name: 'AdminLawyer',
}
</script>
<style scoped>


</style>