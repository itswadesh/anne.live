<template>
  <div class="max-w-full min-h-screen mx-auto text-gray-800">
    <div class="bg-white rounded-md shadow-md border">
      <div
        v-if="reviews && reviews.count > 0"
        class="p-3 sm:p-5 flex flex-row justify-between"
      >
        <span class="text-lg font-semibold"
          >My Reviews({{ reviews.count }})</span
        >
        <div
          v-for="r in reviews.data"
          :key="r.id"
          class="w-full p-1 pb-4 border-b"
        >
          <div class="flex flex-col w-full mt-3 sm:flex-row">
            <div v-if="r.pid" class="mx-auto h-36 sm:pe-5 sm:w-40">
              <img
                v-lazy="r.pid.img"
                alt="mobile"
                class="object-contain w-full h-full"
              />
            </div>
            <div
              class="
                relative
                flex flex-col
                h-auto
                mt-4
                sm:mt-0
                w-full
                sm:flex-1
              "
            >
              <span class="text-gray-700">{{ r.message }}</span>
              <div v-if="r.rating" class="flex flex-row my-2">
                <span
                  style="padding: 2px"
                  class="
                    w-8
                    h-5
                    my-auto
                    text-xs text-center text-white
                    rounded
                    me-3
                    py-auto
                    bg-primary-500
                  "
                >
                  {{ r.rating }} *
                </span>
                <span class="text-sm font-semibold text-normal">
                  <p v-if="r.rating == 1" class="text-red-600">
                    Very Disappointed
                  </p>
                  <p v-if="r.rating == 2" class="text-red-400">
                    Slightly Disappointed
                  </p>
                  <p v-if="r.rating == 3" class="text-accent-500">Good</p>
                  <p v-if="r.rating == 4" class="text-secondary-200">
                    Very Good
                  </p>
                  <p v-if="r.rating == 5" class="text-[#c30b4e]">Awesome</p>
                </span>
              </div>
              <span class="mb-2 text-sm">{{ r.message }}</span>

              <div
                class="
                  flex flex-col
                  w-full
                  mb-2
                  text-sm text-gray-700
                  lg:flex-row
                "
              >
                <div v-if="r.user" class="flex flex-row">
                  <h6>{{ r.user.firstName }} {{ r.user.lastName }}</h6>
                  <svg
                    class="w-4 mx-2 my-auto text-secondary-200"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <h6>Certified Buyer @ {{ r.createdAt | date }}</h6>
                </div>
                <!-- <span class="lg:ms-64">
                  <h4 class="flex flex-row">
                    <h5 class="flex flex-row me-4">
                      <thumbs-up-icon size="1x" class="my-auto me-2 custom-class"></thumbs-up-icon>
                      </span>0</span>
                    </h5>
                    <h5 class="flex flex-row">
                      <thumbs-down-icon size="1x" class="my-auto me-2 custom-class"></thumbs-down-icon>
                      </span>0</span>
                    </h5>
                  </h4>
                </span> -->
              </div>
            </div>
          </div>
          <!-- <div
              class="flex flex-row justify-end mt-4 text-sm text-secondary-500"
            >
              <button class="font-semibold cursor-pointer focus:outline-none">
                Edit
              </button>
              <button
                class="mx-3 font-semibold cursor-pointer focus:outline-none"
              >
                Delete
              </button>
              <button class="font-semibold cursor-pointer focus:outline-none">
                Share
              </button>
            </div> -->
        </div>
      </div>

      <div
        v-else
        class="
          h-screen
          sm:h-auto
          flex flex-col
          items-center
          justify-center
          w-full
          p-5
          sm:p-10
        "
      >
        <img
          v-lazy="`/img/review/review.jpg`"
          alt=""
          class="object-contain h-60 sm:h-96 mb-5 sm:mb-10"
        />

        <h2 class="text-lg sm:text-xl font-medium font-serif tracking-wide">
          No Reviews Yet !!
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
import REVIEWS from '~/gql/review/reviews.gql'

export default {
  data() {
    return {
      reviews: null,
    }
  },
  created() {
    this.getReviews()
  },
  methods: {
    async getReviews() {
      // console.log("helllo theendkd")
      try {
        this.reviews = await this.$get('review/reviews', {})
        this.reviews = (
          await this.$apollo.query({
            query: REVIEWS,
            fetchPolicy: 'no-cache',
          })
        ).data.reviews
        console.log('reviesssss', this.reviews)
      } catch (e) {
        // console.log(e)
      }
    },
  },
}
</script>
