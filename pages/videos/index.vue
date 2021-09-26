<template>
  <section class="md:flex">
    <SidebarOfVideos class="hidden md:block" />
    <AllVideos />
    <SidebarMobile class="block md:hidden" />
  </section>
</template>

<script>
import SidebarOfVideos from '~/components/Video/Sidebar.vue'
import SidebarMobile from '~/components/Video/SidebarMobile.vue'
import AllVideos from '~/components/Video/AllVideos.vue'
export default {
  components: {
    SidebarOfVideos,
    SidebarMobile,
    AllVideos,
  },

  head() {
    return {
      title: 'Videos',
    }
  },
}
</script>

<style></style>
