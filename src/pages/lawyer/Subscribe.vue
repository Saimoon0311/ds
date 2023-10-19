<template lang="">
    <div class="hello">
      <LawyerHeader />
      <main class="container">
        <h3 class="mt-3">
          <router-link
            class="btn btn-secondary btn-sm my-3"
            title="back"
            to="lawyer-account"
            ><i class="bi bi-arrow-left"></i> Back</router-link
          >
          
          Subscribe
        </h3>
        <p>
          Access the Simplawfy platform with a 60 day free trial, then for $39 per
          month. You will not be charged until
          <span id="trialEndingDate">17-12-2023</span>.
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
                            "email" : this.$store.getters?.loginUser?.email,
                            "card_holder_name": this.cardHolderName,
                            "payment_method_id": paymentMethod.id
                        };
                        api.post('/lawyer/create-subscription', formData)
                            .then(res => {
                                console.log('successfully login : ', res?.data)
                                this.$router.push({ path: '/login' });
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