<template lang="">
    <div class="hello">
        <MainHeader />

        <div class="center-main">
            <div class="bg-dark text-white text-center m-3 col-md-6" style="border-radius: 10px">
                <p class="m-4 fs-3">Register your interest to be notified when Simplawfy goes live.</p>
        <form action="index.php" method="post" class="p-2 px-md-5 m-md-3">
            <!-- Name -->
            <div class="d-flex flex-row align-items-center mb-4">
                <i class="fa-solid fa-user fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0">
                    <input type="text" class="form-control" name="name" placeholder="Name" required="">
                </div>
            </div>

            <!-- Email -->
            <div class="d-flex flex-row align-items-center mb-4">
                <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0">
                    <input type="email" class="form-control" name="email" placeholder="Email" required="">
                </div>
            </div>
            
            
            
            
            <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                <button type="submit" class="btn btn-outline-light btn-lg px-5">Submit</button>
            </div>
        </form>
    </div>
</div>
        
    </div>
</template>
<script>
import MainHeader from './global/MainHeader.vue'

export default {
    components: {
    MainHeader,
    // MainFooter
  },
    name: 'NeedLawyer',
}
</script>
<style scoped>
.hello {
    min-height: 100vh;
    display: grid;
}

.center-main {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
}
</style>