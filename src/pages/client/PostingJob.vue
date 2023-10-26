<template lang="">
  <div>
    <ClientHeader />
    <div class="container d-flex justify-content-center">
      <div class="p-3 mb-md-5 mt-md-4 pb-5 border rounded col-md-6 bg-light">
        <p class="h3 text-center">Post a Job</p>

        <label class="d-none">Customer:</label>
        <input
          value="client@mailinator.com"
          readonly=""
          name="customer"
          class="form-control d-none"
        />
        <br />

        <label for="field">
          Area:
          <span class="badge bg-dark text-white text-dark">
            Banking and finance / insolvency
          </span>
        </label>
        <br />

        <input
          value="Banking and finance / insolvency"
          readonly=""
          name="field"
          class="form-control d-none"
        />
        <br />

        <label for="title">Title<sup class="text-danger">*</sup></label>
        <input
          name="title"
          id="title"
          type="text"
          class="form-control"
          required=""
        />
        <br />

        <label for="job"
          >Why do you need a lawyer?<sup class="text-danger"
            >*</sup
          ></label
        >
        <textarea
          name="job"
          id="job"
          type="textarea"
          class="form-control"
          required=""
          v-model="text" @input="checkCharacterLimit" :maxlength="maxCharacters"
        ></textarea>
        <div v-if="characterCount >= maxCharacters" class="warning-text">You have reached your character limit.</div>
        <div class="c-Count">Character Count: {{ characterCount }} / {{ maxCharacters }}</div>
        <br />

        <div class="form-check" >
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckIndeterminate"
            
          />
          <label class="form-check-label" for="flexCheckIndeterminate" @click="showDate">
            I need this done by a certain date
          </label>
        </div>
        <br />

        <div id="deadlineInput" v-if="isVisible">
          <label for="deadline">When do you need this done?</label>
          <input
            name="deadline"
            id="deadline"
            type="date"
            class="form-control"
            min="2023-10-18"
          />
          <br />
        </div>

        <label for="location"
          >Where are you located?<sup class="text-danger">*</sup></label
        >
        <select name="location" id="location" class="form-select" required="">
          <option value="New South Wales">New South Wales</option>
          <option value="Victoria">Victoria</option>
          <option value="Queensland">Queensland</option>
          <option value="Western Australia">Western Australia</option>
          <option value="South Australia">South Australia</option>
          <option value="Tasmania">Tasmania</option>
          <option value="Australian Capital Territory">
            Australian Capital Territory
          </option>
          <option value="Northern Territory">Northern Territory</option>
        </select>
        <br />

        <label for="city"
          >Which city/suburb?<sup class="text-danger">*</sup></label
        >
        <input
          name="city"
          id="city"
          type="text"
          class="form-control"
          required=""
        />
        <br />

        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="contactTimeCheck"
            
          />
          <label  class="form-check-label lpj" for="contactTimeCheck" @click="showContact">
            I have a preferred contact time
          </label>
        </div>
        <br />

        <div id="contactTimeInput" v-if="isVisibleContact"  >
          <label  for="timeframe">When do you prefer to be contacted?</label>
          <input
            name="timeframe"
            id="timeframe"
            type="text"
            class="form-control"
            placeholder="Eg: After 1:00pm AEST"
          />
          <br />
        </div>

        <input
          type="submit"
          name="submit"
          value="Submit"
          class="btn btn-secondary w-100"
        />
      </div>
    </div>
    <!-- --------------- -->

    


  </div>


</template>
<script>
import ClientHeader from "./Header.vue";

export default {
  name: "ClientPostingJob",
  data() {
    return {
      isVisible: false,
      isVisibleContact: false,
      text: "",
      maxCharacters: 2500,
    };
  },
  computed: {
    characterCount() {
      return this.text.length;
    },
  },
  methods: {
    showDate() {
      this.isVisible = !this.isVisible;
    },
    showContact() {
      this.isVisibleContact = !this.isVisibleContact;
    },
    checkCharacterLimit() {
      if (this.characterCount > this.maxCharacters) {
        this.text = this.text.slice(0, this.maxCharacters); // Truncate text to the character limit.
      }
    },
  },
  components: {
    ClientHeader,
  },
};
</script>

<style scoped>
.warning-text {
  color: red;
  margin-top: 10px;
}

.c-Count {
  margin-top: 10px;
}

ul#pills-tab {
  text-align: center;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  width: 225px;
}

.nav-pills .nav-link.active,
.nav-pills .show>.nav-link {
  color: white;
  background-color: #808080;
}

.nav-pills .nav-link,
.nav-link:focus,
.nav-link:hover {
  color: #6d6f73;
}

.bubbles {
  background: rgb(128 128 128);
}

.bubbles:hover {
  background: #5c636a;
}

/* .lpj {
  margin-top: 1px !important;
} */
</style>
