<template>
    <h1>About Us Page</h1>
    <p>{{ fullName }}</p>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
  name: 'AboutUsPage',
 setup(){
    const store = useStore();
    const fullName = computed(() => store.state.fullName);
    return {
        fullName
    }
 }
}
</script>