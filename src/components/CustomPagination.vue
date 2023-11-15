<template>
    <div>
        <ul class="custom-pagination">
            <li @click="previousPage" :class="{ 'disabled': isFirstPage }">
                <i class="fa fa-less-than"></i>
            </li>
            <li v-for="page in lastPaginationPageLoop" :key="page" @click="gotoPage(page)"
                :class="{ 'active': currentPaginationPage === page }">
                {{ page }}
            </li>
            <li v-if="lastPaginationPage > 2">...</li>
            <li v-if="currentPaginationPage > lastPaginationPageLoop" class="active">
                {{ currentPaginationPage }}</li>
            <li @click="nextPage" :class="{ 'disabled': isLastPage }">
                <i class="fa fa-greater-than"></i>
            </li>
        </ul>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            pages: [],
        };
    },
    computed: {
        lastPaginationPageLoop() {
            let pages = this.$store.state.lastPaginationPage;
            if(pages > 2) pages = 2
            return pages;
        },
        lastPaginationPage() {
            let pages = this.$store.state.lastPaginationPage;
            return pages;
        },
        currentPaginationPage() {
            return this.$store.state.currentPaginationPage;
        },
        isFirstPage() {
            return this.currentPaginationPage === 1;
        },
        isLastPage() {
            return this.currentPaginationPage >= this.lastPaginationPage;
        },
    },
    methods: {
        previousPage() {
            console.log('prev func');
            this.$store.commit('page_decrement');
        },
        nextPage() {
            console.log('next func');
            this.$store.commit('page_increment');
        },
        gotoPage(page) {
            console.log('goto func');
            this.$store.commit('set_pagination_page', page);
        },
    },
};
</script>
  
<style scoped>
.custom-pagination {
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.custom-pagination li {
    cursor: pointer;
    padding: 10px;
    border: 1px solid #ccc;
    margin: 0 2px;
}

.custom-pagination li.active {
    background-color: #007BFF;
    color: #fff;
}

.custom-pagination li.disabled {
    pointer-events: none;
    color: #ccc;
}
</style>