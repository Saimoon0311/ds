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
      <form
        id="payment-form"
        action="./backend/create_subscription.php"
        class="col-md-6 border p-3 rounded"
        method="post"
      >
        <div id="card-element" class="StripeElement StripeElement--empty">
          <div
            class="__PrivateStripeElement"
            style="
              margin: 0px !important;
              padding: 0px !important;
              border: none !important;
              display: block !important;
              background: transparent !important;
              position: relative !important;
              opacity: 1 !important;
            "
          >
            <iframe
              name="__privateStripeFrame1676"
              frameborder="0"
              allowtransparency="true"
              scrolling="no"
              role="presentation"
              allow="payment *"
              src="https://js.stripe.com/v3/elements-inner-card-13c9823a2d039be93e07f6cd3696112e.html#wait=false&amp;mids[guid]=NA&amp;mids[muid]=3a7e4dd8-d13f-4b22-bc7b-d370fe0cee7838ebd4&amp;mids[sid]=996b4bf7-a7e6-41a3-8747-ded8d5820894748c6f&amp;rtl=false&amp;componentName=card&amp;keyMode=test&amp;apiKey=pk_test_51NUgYaBknhiYNvPSEv46DkXpdgX4MoovIFoTjRbRFaXJfdj6ZYFVfbcfmjXRIPjFqF8YANCpk3oI64bLr2zkZP3r0073AAlaXc&amp;referrer=http%3A%2F%2Flocalhost%2Fsimplawfy%2Flawyer%2Fsubscribe.php&amp;controllerId=__privateStripeController1671"
              title="Secure card payment input frame"
              style="
                border: none !important;
                margin: 0px !important;
                padding: 0px !important;
                width: 1px !important;
                min-width: 100% !important;
                overflow: hidden !important;
                display: block !important;
                user-select: none !important;
                transform: translate(0px) !important;
                color-scheme: light only !important;
                height: 16.8px;
              "
            ></iframe
            ><input
              class="__PrivateStripeElement-input"
              aria-hidden="true"
              aria-label=" "
              autocomplete="false"
              maxlength="1"
              style="
                border: none !important;
                display: block !important;
                position: absolute !important;
                height: 1px !important;
                top: -1px !important;
                left: 0px !important;
                padding: 0px !important;
                margin: 0px !important;
                width: 100% !important;
                opacity: 0 !important;
                background: transparent !important;
                pointer-events: none !important;
                font-size: 16px !important;
              "
            />
          </div>
        </div>
        <input
          type="text"
          placeholder="Card Holder Name"
          class="form-control mt-3"
          required=""
          name="card-holder-name"
          id="card-holder-name"
        />
        <button type="submit" class="btn btn-dark mt-3">
          Add Payment Method
        </button>
      </form>

      <small>Payments are processed through Stripe, Inc.</small>
    </main>
  </div>
</template>
<script>
import LawyerHeader from "./Header.vue";
export default {
  components: {
    LawyerHeader,
  },
  methods: {},
  name: "SubscribePage",
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
