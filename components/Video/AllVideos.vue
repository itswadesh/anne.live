<template>
  <section v-if="videos" class="container mx-auto w-full p-2 py-5 sm:p-8">
    <h1
      class="
        pb-5
        sm:pb-10
        font-black
        tracking-wide
        text-3xl
        lg:text-4xl
        text-center
        flex flex-col
        items-center
        sm:items-start
        max-w-max
        mx-auto
      "
    >
      <span>Stored Videos</span>
      <hr class="mt-2.5 border-t-4 border-gray-800 opacity-50 w-20" />
    </h1>

    <div
      v-if="videos && videos.data && videos.data.length"
      class="
        grid grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        gap-2
        sm:gap-5
        justify-items-center
      "
    >
      <div
        v-for="(v, vx) in videos.data"
        :key="vx.id"
        class="
          bg-white
          rounded-md
          p-2
          md:p-4
          shadow-md
          hover:shadow-lg
          w-full
          max-w-xs
          flex-1
        "
      >
        <SingleVideoCard :video="v" />
      </div>
    </div>
    <!-- <div class="my-10 justify-center flex">
      <button class="font-medium hover:text-primary-500">Load More</button>
    </div> -->
    <Pagination
      class="mt-5"
      :count="noOfPages"
      :current="parseInt($route.query.page || 1)"
      @change="changePage"
    />
  </section>
</template>

<script>
import SingleVideoCard from '~/components/Video/SingleVideoCard.vue'
import VIDEOS from '~/gql/video/videos.gql'
import { Pagination } from '~/shared/components/ui'

export default {
  components: {
    SingleVideoCard,
    Pagination,
  },
  data() {
    return {
      videos: null,
    }
  },
  computed: {
    noOfPages() {
      return Math.ceil(
        this.productCount /
          (this.$store.state.store && this.$store.state.store.pageSize)
      )
    },
  },
  async created() {
    const videos = await this.$get('video/videos', {})
    this.videos = videos
    // const videos = await this.$apollo.query({
    //   query: VIDEOS,
    // })
    // this.videos = videos.data.videos
  },
  methods: {
    changePage(p) {
      const query = this.$route.query
      query.page = p
      query._ = new Date().getTime()
      this.scrollToTop()
      const url = constructURL('/', query)
      const cslug = this.$route.path.substr(1)
      this.$router.push(`/${cslug}${url}&page=${p}`)
    },
  },
}
</script>

<style></style>
