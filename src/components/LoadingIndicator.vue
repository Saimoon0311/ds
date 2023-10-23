<!-- components/LoadingIndicator.vue -->
<template>
    <div v-if="isLoading" class="loading-indicator">
      <div class="loader"></div>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  
  export default {
    computed: {
      ...mapState(['isLoading']),
    },
  };
  </script>
  
  <style scoped>
  .loading-indicator {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .loader {
    border: 4px solid #e8c1c1;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>