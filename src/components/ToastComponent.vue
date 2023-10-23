<template>
    <div v-if="toastMessage != null">
        <!-- Button to trigger the toast -->
        <button @click="showToast" class="btn btn-primary">Show Toast</button>

        <!-- Toast container -->
        <div class="position-fixed top-0 end-0 p-3" style="z-index: 5">
            <div v-for="(toast, index) in toasts" :key="index" class="toast" role="alert" aria-live="assertive"
                aria-atomic="true">
                <div class="toast-header">
                    <strong class="me-auto">{{ toast.title }}</strong>
                    <small>{{ toast.time }}</small>
                    <button @click="closeToast(index)" type="button" class="btn-close" data-bs-dismiss="toast"
                        aria-label="Close"></button>
                </div>
                <div class="toast-body">{{ toast.message }}</div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { mapState } from 'vuex';
export default {
    data() {
        return {
            toasts: [],
        };
    },
    computed: {
      ...mapState(['toastMessage']),
    },
    methods: {
        showToast() {
            const newToast = {
                title: 'Bootstrap 5 Toast',
                message: 'This is a Bootstrap 5 toast in a Vue 3 app!',
                time: new Date().toLocaleTimeString(),
            };

            this.toasts.push(newToast);
            setTimeout(() => this.closeToast(this.toasts.indexOf(newToast)), 5000);
        },
        closeToast(index) {
            this.toasts.splice(index, 1);
        },
    },
};
</script>