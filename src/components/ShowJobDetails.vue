<template>
  <div
    class="border rounded d-flex justify-content-between text-white flex-column mb-3 col-md-7 m-auto  p-0"
    id="28"
  >
  
    <div class="card-cus">
      <div class="card-top p-3 bg-col">
        <div>
          <p class="badge" title="Area">
            {{ jobData?.field?.title }}
          </p>

          &nbsp;
          <p class="badge" title="Location">
            {{ jobData?.location?.title }}
          </p>
          &nbsp;
        </div>
        <div>
          <p span class="smallFont">
            <b>Job No: </b>{{ jobData?.identity }}
          </p>
        </div>
      </div>
      <div class="p-3">
      <div class="card-body d-flex align-items-start justify-content-between">
        <p class="text-left text-black text-bold title pt-3 ">
          {{ jobData?.title }}
        </p>
      </div>
      <div id="description" class="descriptionText text-black">
        {{ jobData?.description }}
      </div>
      <div class="widthcn">
        <span class="spacer">
          <button
            :disabled="!jobData?.requirement"
            type="button"
            class="btn btn-sm custom-pad badge bg-dark"
            :data-target="`.edit-job-title-modal${index}`"
            title="Edit"
            :data-bs-toggle="`modal${index}`"
            data-bs-target="#Accessibility"
            @click="openRequirementsModal(jobData?.requirement)"
          >
            Accessibility Requirements
          </button>
         
            <p class="smallFont text-black">
              <b>Posted by: </b>{{ jobData?.owner?.first_name }}
              {{ jobData?.owner?.last_name }}
              <span class="text-capitalize">({{ jobData?.city }})</span>
              on {{ formatCreatedAt(jobData?.created_at) }} 
            </p>
        
        </span>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["jobData"],
};
</script>

<style scoped>
.card-cus{
  box-shadow: 5px 5px 20px #00000017;
}
.smallFont {
  font-size: 16px;
  margin: 0;
}
.smallFont1 span {
  font-weight: 400;
}
.smallFont1 {
  font-size: 16px;
  margin: 0 0 5px 0;
  color: black;
}
.descriptionText {
  overflow: hidden;
  text-overflow: ellipsis;
  height: 100px;
  line-break: anywhere;
  overflow-y: auto;
  padding-right: 10px;
  margin-right: 5px;
}
.title{
  font-size: 20px;
  font-weight: 400;
}
.descriptionText::-webkit-scrollbar {
  width: 6px;
  border-radius: 10px;
}

.descriptionText::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(217, 217, 217, 1);
  border-radius: 10px;
}

.descriptionText::-webkit-scrollbar-thumb {
  background-color: rgba(217, 217, 217, 1);
  /* outline: 1px solid #292929; */
  border-radius: 10px;
}
.badge {
  font-size: 14px;
  font-weight: 400;
  border: 1px solid rgba(255, 255, 255, 1);
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  margin: 0;
}
.card-top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px 5px 0 0;
  border-bottom: 1px solid #ffffff7a; 
}
.spacer {
  margin: 20px 0 0 0;
  display: block;
  padding-top: 20px;  
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.bg-col{
  background: rgba(55, 59, 62, 1);

}
@media only screen and (max-width: 1200px) {
  .badge, .smallFont{
    font-size: 12px;
  }
  .title{
  font-size: 16px;
  font-weight: 400;
}
}
@media only screen and (max-width: 992px) {
 .f-main .col-md-7{
  width: 80%;
 }
  .smallFont {
    margin: 5px;
    font-size: 12px;
  }
}
@media only screen and (max-width: 768px) {
  .f-main .col-md-7 {
  width: 80%;
 }
}
@media only screen and (max-width: 767px) {
  .f-main .col-md-7 {
  width: 100%;
 }
}
@media only screen and (max-width: 500px) {
  .badge, .smallFont{
    margin-bottom: 5px;
  }
  .spacer {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
    align-content: flex-start;
    flex-wrap: wrap;
  }
}
</style>
