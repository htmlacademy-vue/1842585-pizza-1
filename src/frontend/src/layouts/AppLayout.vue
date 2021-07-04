<template>
  <div class="app-layout">
    <AppLayoutHeader />
    <div class="content">
      <!-- <AppLayoutMainSidebar /> -->
      <Index />
    </div>
  </div>
</template>

<script>
// import AppLayoutMainSidebar from '@/layouts/AppLayoutMainSidebar';
import AppLayoutHeader from '@/layouts/AppLayoutHeader';
import Index from '@/views/Index.vue';

export default {
  name: 'AppLayout',
  components: {
    // AppLayoutMainSidebar,
    AppLayoutHeader,
    Index,
  }
};
</script>
