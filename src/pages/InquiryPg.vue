<template lang="">
   <section class="lp-main">
        <div class="container">
            <div class="row justify-content-center ">
                <div class="col-md-8 col-lg-6 col-sm-12 text-center">
                    <img src="../assets/images/new-main.png" alt="" class="img-fluid logo-lp">
                    <p class="my-5">Simplawfy® is an independent legal marketplace platform connecting individuals and businesses with legal professionals moving in different circles.</p>
                    <a
                    href="mailto:info@makinglawsimple.com.au"
                    class="btn btn-dark softblue text-white rounded-pill enq"
                    >Enquire Today</a>                  
                </div>
                
            </div>
        </div>
        <p class="footer-lp text-center">
                    © 2024 Simplawfy Pty Ltd.
                </p>
   </section>
  </template>
  <script>
  //   import GeneralHeader from "../pages/GeneralHeader.vue";
//   import MainFooter from "../components/global/MainFooter.vue";
  //   import ClientHeader from "../pages/client/Header.vue";
  //   import LawyerHeader from "../pages/lawyer/Header.vue";
  
  export default {
    components: {
      //   GeneralHeader,
    //   MainFooter,
      //   ClientHeader,
      //   LawyerHeader
    },
  
    computed: {
      loginUserData() {
        console.log("dhuurr", this.$store.getters?.loginUser);
        return this.$store.getters?.loginUser;
      },
    },
    name: "InquiryPg",
  };
  </script>
  <style scoped>
 
.enq{
  width: 220px;
}
.container{
    min-height: inherit;
  }
 .row {
    min-height: inherit;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .lp-main{
    position: relative;
    /* padding-bottom: 60px; */
    min-height: 100vh;
  }
  .logo-lp {
    width: 80%;
}
  .footer-lp{
    position: absolute;
    bottom: 0;
    width: 100%;
    font-size: 14px;
    margin-bottom: 10px;
  }
  .top-avatar {
    width: 400px;
    border-radius: 50%;
    height: 400px;
    object-fit: cover;
  }
  .left-inner {
    position: relative;
    text-align: center;
  }
  .btn-inner a {
    width: 220px;
  }
  .parabox {
    width: 35%;
    margin: auto;
    background: black;
    margin: 10px;
    text-align: center;
    border-radius: 50px;
    padding: 30px 10px;
    color: white !important;
  }
  .parabox p {
    margin: 0;
    color: white !important;
    font-size: 14px;
  }
  p.img-bottom {
    right: -10%;
    width: 70%;
    text-align: center;
    margin: 0;
    border-radius: 30px;
    font-size: 16px;
    padding: 20px 5px;
    margin-top: -50px;
    z-index: 1;
    background: black !important;
    position: relative;
    margin-left: auto;
  }
  .new-logo {
    width: 400px;
  }
  .main-text {
    font-size: 1.2vw;
  }
  .how-tabs a {
    text-decoration: none;
  }
  .howItWorks {
    min-height: 100vh;
    position: relative;
    padding-bottom: 60px;
  }
  
  p {
    font-size: 18px;
    color: #000;
  }
  
  .small-para {
    font-size: 12px;
  }
  
  .values-inner {
    display: flex;
    justify-content: space-evenly;
  }
  
  .no-mar {
    margin: 0px;
  }
  
  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  
  .signup {
    width: auto !important;
  }
  
  .col img {
    width: 60px;
  }
  
  .mainbox {
    width: 98%;
    margin: 25px auto;
    padding: 0 1%;
    /* border-top: solid 5px #000; */
  }
  
  .box01,
  .box02,
  .box03,
  .box04,
  .box05 {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #000;
    color: #fff;
    font-weight: 400;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    /* margin-top: -27px; */
    margin: -23px auto 10px auto;
  }
  
  .subbox {
    width: 150px;
    margin: 5px auto 35px auto;
  }
  
  .subbox03 {
    width: 200px;
    margin: 5px auto 35px auto;
  }
  
  .subbox img {
    display: table;
    margin: 8px auto;
    text-align: center;
    min-height: 60px;
  }
  
  /* .subbox a {
      color: #0d6efd;
    } */
  
  .tandc,
  .tandc:hover {
    color: #000;
    text-decoration: none;
    font-weight: 400;
  }
  
  .subbox a:hover {
    color: #000;
  }
  
  .boxheading {
    font-size: 16px;
    text-transform: uppercase;
    text-align: center;
    color: #000;
    display: block;
  }
  
  .subbox03 img {
    display: table;
    margin: 8px auto;
    text-align: center;
    min-height: 60px;
  }
  
  .subbox03 a {
    color: #0d6efd;
  }
  
  .subbox03 a:hover {
    color: #000;
  }
  
  .col {
    border-top: 5px solid;
  }
  
  .how-tabs {
    border: none;
    text-align: center;
    justify-content: center;
  }
  
  .how-tabs a.active {
    border: none;
    border-bottom: 5px solid #000;
    color: #000;
  }
  
  .how-tabs a {
    border: none;
    border-bottom: 5px solid rgb(218, 218, 218);
    padding: 8px 60px;
    font-size: 22px;
    color: #000;
  }
  .colorblue {
    color: #88c7fa;
  }
  ol,
  ul {
    padding-left: 1rem;
    margin: 0;
  }
  .row-flip ul li {
      margin-bottom: 15px;
  }
  .row-flip ul li:last-child {
      margin-bottom: 0;
  }
  @media only screen and (max-width: 1600px) {
      .parabox{
          width: 45%;
      }
  }
  @media only screen and (max-width: 1440px) {
    .img-bottom {
      width: 100% !important  ;
    }
  }
  @media only screen and (max-width: 1024px) {
      .inner-row .col-md-4 {
      width: 50%;
  }
      .colshow{
          display: none;
      }
      .values-inner{
      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;
  }
  .parabox{
          width: 95%;
      }
    .top-avatar {
      width: 300px;
      height: 100%;
    }
  }
  @media only screen and (max-width: 991px) {
    .img-bottom {
      right: 0 !important;
    }
  }
  @media only screen and (max-width: 767px) {
    .lp-main{

    padding-bottom: 60px;
  
  }
    .lp-main{
      min-height: 90vh;
    }
      .row-flip {
      display: flex;
      flex-direction: column-reverse;
  }
  .inner-row .col-md-4 {
      width: 100%;
      margin-bottom: 20px;
  }
  .inner-row{
      margin-bottom: 20px;
  }
  .inner-row h4{
      text-align: center;
  }
    .how-tabs a {
      padding: 10px 30px;
    }
    .top-avatar {
      width: 300px;
      height: 300px;
    }
    .mainbox {
      margin: 0 0 25px 0 !important;
    }
    .btn-inner {
      margin: 0 !important;
    }
    .img-bottom {
      margin-top: 20px !important;
      margin-bottom: 20px !important;
    }
    p {
      font-size: 16px;
      color: #000;
    }
    .main-text {
      font-size: 16px;
    }
    .new-logo {
      width: 220px;
    }
    .col {
      width: 50%;
      flex: none;
    }
  
    .subbox {
      width: 100%;
      text-align: center;
    }
  
    .subbox03 {
      width: 100%;
      text-align: center;
    }
  }
  
  @media only screen and (min-width: 576px) and (max-width: 767px) {
    .col {
      width: 50% !important;
      flex: none;
    }
  
    .subbox {
      width: 100%;
      text-align: center;
    }
  
    .subbox03 {
      width: 100%;
      text-align: center;
    }
  }
  
  @media only screen and (min-width: 480px) and (max-width: 575px) {
    .col {
      width: 100%;
      flex: none;
    }
  
    .subbox {
      width: 100%;
      text-align: center;
    }
  
    .subbox03 {
      width: 100%;
      text-align: center;
    }
  }
  
  @media only screen and (min-width: 0px) and (max-width: 479px) {
    .col {
      width: 100%;
      flex: none;
    }
  
    .subbox {
      width: 100%;
      text-align: center;
    }
  
    .subbox03 {
      width: 100%;
      text-align: center;
    }
  }
  
  @media only screen and (min-width: 768px) and (max-width: 991px) {
    .main-text {
      font-size: 16px;
    }
    .col {
      width: 50%;
      flex: none;
    }
  
    .subbox {
      width: 100%;
      text-align: center;
    }
  
    .subbox03 {
      width: 100%;
      text-align: center;
    }
    .new-logo {
      width: 250px;
    }
  }
  
  @media only screen and (min-width: 992px) and (max-width: 1199px) {
    .main-text {
      font-size: 16px;
    }
    .new-logo {
      width: 300px;
    }
    .col {
      width: 33%;
      flex: none;
    }
  }
  </style>
  