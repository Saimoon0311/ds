<template>
    <div>
        <!-- <button @click="initializeStripe">Initialize Stripe</button> -->
    </div>

    <main class="container">
        <router-link to="/client-dashboard">back</router-link>
        <h3 class="mt-3"><a class="btn btn-secondary btn-sm my-3" title="back" href="./account.php"><i
                    class="bi bi-arrow-left"></i> Back</a> Subscribe </h3>
        <p>
            Access the Simplawfy platform with a 60 day free trial, then for $39 per month. You will not be charged until
            <span id='trialEndingDate'></span>.
        </p>
        <!-- <form id="payment-form" action="./backend/create_subscription.php" class="col-md-6 border p-3 rounded"
            method="post">
            <div id="card-element"></div>
            <input type="text" placeholder="Card Holder Name" class="form-control mt-3" required name="card-holder-name"
                id="card-holder-name" />
            <button type="submit" class="btn btn-dark mt-3">Add Payment Method</button>
        </form> -->

        <div>
            <div id="card-element"></div>
            <input type="text" v-model="cardHolderName" placeholder="Card Holder Name" class="form-control mt-3" required
                name="card-holder-name" id="card-holder-name" />
            <button type="button" @click="subscribe" class="btn btn-dark mt-3">Add Payment Method</button>
        </div>


        <small>Payments are processed through Stripe, Inc.</small>

    </main>
</template>
  
<script>
import api from "../../config/api.js";
export default {
    name: "SubscriptionComponent",
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