<template lang="">
    <div class="footer-main">
        <div>
            
            © 2023 simplawfy pty ltd. | <router-link class="link" to="/privacy-policy">privacy policy</router-link> | <router-link class="link" to="/terms-of-use">website terms of use</router-link> | contact | <a class="sitemap link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                site map <i class=" caret-ico fa-solid fa-angle-up"></i>
          </a>&nbsp;&nbsp;&nbsp;| 
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a class="dropdown-item" href="#">About Us</a></li>
            <li><a class="dropdown-item" href="#">How Simplawfy Works</a></li>
            <li><a class="dropdown-item" href="#">FAQs</a></li> 
            <li><a class="dropdown-item" href="#">Contact Us</a></li> 
          </ul>
            <span>
                <a class="a" target="_blank" href="https://www.linkedin.com/simplawfylaw"><i class="fa-brands fa-linkedin"></i></a> 
                <a class="a" target="_blank" href="https://www.facebook.com/simplawfy"><i class="fa-brands fa-facebook-f"></i></a>
                <a class="a" target="_blank" href="https://www.instagram.com/simplawfylaw/"><i class="fa-brands fa-instagram"></i></a>
            </span>
        </div>

       
    </div>
</template>
<script>
export default {

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
    background: rgb(241, 241, 241);
    text-align: center;
    padding: 10px 0;
    font-size: 15px;
    font-weight: 900;
    text-transform: uppercase;
    color: #858585;
}

.footer-main .a {
    color: #858585;
    font-size: 25px;
}

.footer-main .a:nth-child(2) {
    margin: 0px 10px;
    position: relative;
    top: -1px;
}

.footer-main span {
    position: relative;
    top: 5px;
    margin-left: 8px;
}

.footer-main .link {
    /* font-size: 15px; */
    font-weight: 900;
    text-transform: uppercase;
    color: #858585;
    text-decoration: none;
}

.caret-ico {
    position: absolute;
    top: 1%;
    background-color: #f1f1f1;
    padding: 3px;
}

.sitemap {
    position: relative;
}

.dropdown-item {
    font-weight: 600;
}
</style>