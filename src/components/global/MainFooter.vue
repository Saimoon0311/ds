<template lang="">
    <div class="footer-main">
        <div>
            
            © 2023 Simplawfy Pty Ltd. | <router-link class="link" to="/privacy-policy">Privacy Policy</router-link> | <router-link class="link" to="/terms-of-use">Website Terms of Use</router-link> | <router-link class="link" to="/contact-us">Contact</router-link> | <a class="sitemap link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Site Map <i class=" caret-ico fa-solid fa-angle-up"></i>
          </a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| 
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><router-link class="dropdown-item" to="/about-us">About Us</router-link></li>
            <!-- <li><router-link class="dropdown-item" to="/faqs">FAQs</router-link></li>  -->
            
            <li v-if="loginUser != null && loginUser?.type == 'client' "><router-link class="dropdown-item" to="/client-faqs" >FAQs</router-link></li>
            <li v-if="loginUser != null && loginUser?.type == 'lawyer' "><router-link class="dropdown-item" to="/lawyer-faqs"  >FAQs</router-link></li>
            
            <li><router-link class="dropdown-item" to="/how-simplawfy-works">How Simplawfy Works</router-link></li>
            <!-- <li><router-link class="dropdown-item" to="/how-simplawfy-works-lawyers">How Simplawfy Works</router-link></li> -->
            <li><router-link class="dropdown-item" to="/contact-us">Contact Us</router-link></li> 
          </ul>
            <span>
                <a class="a" target="_blank" href="https://www.linkedin.com/company/simplawfylaw"><i class="fa-brands fa-linkedin"></i></a> 
                <a class="a" target="_blank" href="https://www.facebook.com/simplawfy"><i class="fa-brands fa-facebook-f"></i></a>
                <a class="a" target="_blank" href="https://www.instagram.com/simplawfylaw/"><i class="fa-brands fa-instagram"></i></a>
            </span>
        </div>

       
    </div>
</template>
<script>
export default {
    computed: {
        loginUser() {
            // console.log("asdasd", this.$store.getters.loginUser)
            return this.$store.getters.loginUser;
        }
    }
}
</script>
<style scoped>
.footer-main {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    flex-wrap: wrap;

}

.footer-main div {
    width: 100%;
    /* background: rgb(241, 241, 241); */
    text-align: center;
    padding: 4px 0;
    font-size: 12px;
    font-weight: 600;
    /* text-transform: uppercase; */
    color: #000;
    letter-spacing: 1px;
}

.footer-main .a {
    color: #000;
    font-size: 20px;
}

.footer-main .a:nth-child(2) {
    margin: 0px 10px;
    position: relative;
    top: -1px;
    font-size: 17px;
}

.footer-main .a:last-child {
    font-size: 20px;
    position: relative;
    top: 0.5px;

}

.footer-main span {
    position: relative;
    top: 3px;
    margin-left: 8px;
}

.footer-main .link {
    /* font-size: 15px; */
    font-weight: 600;
    /* text-transform: uppercase; */
    color: #000;
    text-decoration: none;
}

.caret-ico {
    position: absolute;
    top: 1%;
    background-color: #fff;
    padding: 3px;
}

.sitemap {
    position: relative;
}

.sitemap.dropdown-toggle::after {
    display: none;
}

.dropdown-item {
    font-weight: 600;
}

@media (min-width: 320px) and (max-width: 425px) {
    .footer-main span {
        display: block;
    }
}

@media (min-width: 500px) and (max-width: 1024px) {

    .footer-main div {
        padding: 4px 5px;
    }
}
</style>