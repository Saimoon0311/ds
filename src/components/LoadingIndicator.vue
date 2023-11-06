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
  z-index: 999 !important;
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
  z-index: 9999 !important;
  border: 4px solid rgb(211, 211, 211);
  border-top: 4px solid #000;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>