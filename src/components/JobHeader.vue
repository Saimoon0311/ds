<template>
    <div
      class="border rounded d-flex justify-content-between text-white flex-column mb-3 col-md-12 m-auto bg-col p-0"
      id="28"
    >
      <div class="">
        <div class="card-top p-3">
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
              Job No: <b>{{ jobData?.identity }}</b>
            </p>
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
  