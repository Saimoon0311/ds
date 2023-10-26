<template lang="">
    <div class="hello">
      <LawyerHeader />
      <main class="container">
        <h3 class="mt-3">
          <button  class="btn btn-secondary btn-sm my-3" 
          @click="()=>this.$router.go(-1)"><i class="bi bi-arrow-left mr-4"></i> Back</button>
          
          <!-- <router-link
            class="btn btn-secondary btn-sm my-3"
            title="back"
            to="lawyer-account"
            ><i class="bi bi-arrow-left"></i> Back</router-link
          > -->
          
          <span v-if="!this.replacePaymentMethod">Subscribe</span><span v-else>Replace Payment Method</span>
        </h3>
        <p v-if="!this.replacePaymentMethod">
          Access the Simplawfy platform with a 60 day free trial, then for $39 per
          month. You will not be charged until
          <span id="trialEndingDate">{{ trialEndDate }}</span>.
        </p>
       

        <div>
            <div id="card-element"></div>
            <input type="text" v-model="cardHolderName" placeholder="Card Holder Name" class="form-control mt-3" required
                name="card-holder-name" id="card-holder-name" />
            <button type="button" @click="subscribe" class="btn btn-dark mt-3">Add Payment Method</button>
        </div>
  
        <small>Payments are processed through Stripe, Inc.</small>
      </main>
    </div>
  </template>

  
<script>
import api from "../../config/api.js";
import LawyerHeader from "./Header.vue";
import { mapState } from 'vuex';
export default {
  name: "SubscriptionComponent",
  components: {
    LawyerHeader,
  },
  data() {
    return {
      cardHolderName: null,
      cardElement: null,
      // paymentMethodId : null,
      stripeLoaded: false,
      stripe: null,
    };
  },
  computed: {
    ...mapState(['replacePaymentMethod']),

    trialEndDate() {
      const currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() + 2);
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const year = currentDate.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;
      return formattedDate;
    },
  },
  created() {
    this.initializeStripe();
  },
  methods: {
    async subscribe() {
      try {
        if (this.cardHolderName != null && this.cardHolderName != "") {
          // disable button subscription button while loading
          // Create a payment method using the card Element
          const {
            paymentMethod,
            error
          } = await this.stripe.createPaymentMethod({
            type: 'card',
            card: this.cardElement,
            billing_details: {
              name: this.cardHolderName
            },
          });
          console.log(paymentMethod, error);

          if (error) {
            console.error(error.message);
            // form.querySelector('button').disabled = false;
          } else {
            const formData = {
              "email": this.$store.getters?.loginUser?.email,
              "card_holder_name": this.cardHolderName,
              "payment_method_id": paymentMethod.id
            };
            const url = this.replacePaymentMethod ? "/lawyer/replace-payment-method" : "/lawyer/create-subscription";
            api.post(url, formData)
              .then(res => {
                // console.log('successfully login : ', res?.data?.data?.id)
                if (this.replacePaymentMethod) {
                  this.$swal('Success', 'Your payment method has been replaced successfully', 'success').then(() => {
                    this.$router.push({ path: '/lawyer-account' });
                  });
                }
                if (res?.data?.data?.id !== undefined && res?.data?.data?.id !== null && res?.data?.data?.id !== '') {
                  // this.$store.commit('setToast', "you have been subscribed successfully");
                  this.$swal('Success', 'You have been subscribed successfully', 'success').then(() => {
                    this.$router.push({ path: '/lawyer-account' });
                  });
                }
              })
              .catch(error => console.log("getResults : ", error));
          }
        }
      } catch (error) {
        console.error('API request error:', error);
      }



    },

    async initializeStripe() {
      if (!this.stripeLoaded) {
        const stripeScript = document.createElement('script');
        stripeScript.src = 'https://js.stripe.com/v3/';
        //   stripeScript.onload = this.loadStripe;
        console.log(stripeScript);
        stripeScript.onload = () => {
          this.stripe = window.Stripe('pk_test_51NUgYaBknhiYNvPSEv46DkXpdgX4MoovIFoTjRbRFaXJfdj6ZYFVfbcfmjXRIPjFqF8YANCpk3oI64bLr2zkZP3r0073AAlaXc');
          this.stripeLoaded = true;
          const elements = this.stripe.elements();
          // const cardElement = elements.create('card');
          // cardElement.mount('#card-element');

          this.cardElement = elements.create('card');
          this.cardElement.mount('#card-element');

          console.log('sub : ' + this.stripe);
        }
        document.head.appendChild(stripeScript);
      } else {
        this.loadStripe();
      }
    },
    //   loadStripe() {
    //     this.stripe = Stripe('pk_test_51NUgYaBknhiYNvPSEv46DkXpdgX4MoovIFoTjRbRFaXJfdj6ZYFVfbcfmjXRIPjFqF8YANCpk3oI64bLr2zkZP3r0073AAlaXc');
    //     this.stripeLoaded = true;
    //     console.log(this.stripe);
    //     // Now you can use this.stripe to interact with Stripe.js
    //   },
  },
};
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

.navbar-nav .left-menu {
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