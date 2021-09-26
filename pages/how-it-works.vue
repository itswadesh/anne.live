<template>
  <section class="text-gray-800 bg-white">
    <div class="relative">
      <img src="/img/mushroom.jpg" alt="" class="object-cover w-full h-96" />
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="absolute inset-0 px-5">
        <h1 class="mt-16 md:mt-32 text-white text-center text-4xl">
          Everything you need to start selling online!
        </h1>
        <h1 class="mt-5 text-white text-center text-lg font-semibold">
          IT'S MADE FOR YOU
        </h1>
        <div class="mt-5 max-w-max mx-auto">
          <button
            class="
              text-white
              bg-yellow-500
              hover:bg-yellow-400
              transition
              duration-300
              focus:outline-none
              py-2
              px-6
            "
          >
            START SELLING
          </button>
        </div>
      </div>
    </div>

    <div class="my-10">
      <div class="text-center px-5">
        <h1 class="text-3xl font-bold">HOW IT WORKS</h1>
        <div class="mt-5 text-gray-500">
          <i>It's Good To Know How The System Works, Before You Register</i>
        </div>
      </div>

      <div class="antialiased mt-20">
        <div
          class="container mx-auto px-4 flex flex-col space-y-16 md:space-y-32"
        >
          <div>
            <div class="relative">
              <div
                class="
                  w-0.5
                  bg-gray-200
                  absolute
                  z-0
                  left-0
                  right-0
                  h-60
                  md:h-80
                  ms-12
                  md:mx-auto
                "
              ></div>
              <img
                src="/img/step_1.png"
                alt=""
                class="timeline-img relative z-10"
              />
            </div>
            <div class="md:pt-5 md:text-end -mt-20 md:-mt-0 md:w-1/2">
              <div
                class="
                  md:ms-auto
                  max-w-lg
                  md:max-w-md
                  ps-28
                  md:ps-0 md:pe-20
                  lg:pe-28
                "
              >
                <h5 class="text-lg font-semibold">Register as Merchant</h5>
                <p class="mt-2 text-sm text-gray-500">
                  Creating an account is very simple, Your merchant dashboard
                  will be ready as soon as you're registered. You can manage
                  everything that belongs to your store and running the
                  business.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div class="relative">
              <div
                class="
                  w-0.5
                  bg-gray-200
                  absolute
                  z-0
                  left-0
                  right-0
                  h-60
                  md:h-80
                  ms-12
                  md:mx-auto
                "
              ></div>
              <img
                src="/img/step_2.png"
                alt=""
                class="timeline-img relative z-10"
              />
            </div>
            <div class="md:pt-5 md:w-1/2 md:ms-auto -mt-20 md:-mt-0">
              <div class="me-auto max-w-lg md:max-w-md ps-28 md:ps-20 lg:ps-28">
                <h5 class="text-lg font-semibold">List Your Items</h5>
                <p class="mt-2 text-sm text-gray-500">
                  Listing your products is really simple through our easy to use
                  the self-serve portal. Upload including high-quality product
                  images and additional details.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div class="relative">
              <div
                class="
                  w-0.5
                  bg-gray-200
                  absolute
                  z-0
                  left-0
                  right-0
                  h-60
                  md:h-80
                  ms-12
                  md:mx-auto
                "
              ></div>
              <img
                src="/img/step_3.png"
                alt=""
                class="timeline-img relative z-10"
              />
            </div>
            <div class="md:pt-5 md:text-end -mt-20 md:-mt-0 md:w-1/2">
              <div
                class="
                  md:ms-auto
                  max-w-lg
                  md:max-w-md
                  ps-28
                  md:ps-0 md:pe-20
                  lg:pe-28
                "
              >
                <h5 class="text-lg font-semibold">Sell & Fulfill Orders</h5>
                <p class="mt-2 text-sm text-gray-500">
                  After you list your offers, customers can visit them on the
                  Marketplace. We'll notify you when customers place an order.
                  Fulfill the order on promised time is very important.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div class="relative">
              <div
                class="
                  w-0.5
                  bg-gray-200
                  absolute
                  z-0
                  left-0
                  right-0
                  h-60
                  md:h-80
                  ms-12
                  md:mx-auto
                "
              ></div>
              <img
                src="/img/step_4.png"
                alt=""
                class="timeline-img relative z-10"
              />
            </div>
            <div class="md:pt-5 md:w-1/2 md:ms-auto -mt-20 md:-mt-0">
              <div class="me-auto max-w-lg md:max-w-md ps-28 md:ps-20 lg:ps-28">
                <h5 class="text-lg font-semibold">Get Paid Instantly</h5>
                <p class="mt-2 text-sm text-gray-500">
                  We don't hold your money, the payment will be sent to your
                  connected account directly.
                </p>
              </div>
            </div>
          </div>

          <div class="pb-60">
            <div
              class="
                timeline-img
                relative
                z-10
                bg-yellow-400
                flex
                items-center
                justify-center
              "
            >
              <h5
                class="
                  uppercase
                  text-white text-sm
                  lg:text-xl
                  font-semibold
                  text-center
                  flex flex-col
                "
              >
                <span> Be part</span> <span>of your</span> <span>story</span>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  head() {
    return {
      title: 'How it works',
    }
  },
}
</script>

<style scoped>
.timeline-img {
  @apply h-24 w-24 lg:h-40 lg:w-40 object-cover rounded-full shadow-md border-4 border-gray-200 md:absolute md:mx-auto md:right-0 md:left-0;
}

/* .timeline-container {
  @apply relative pt-2 sm:ps-24 ms-2 sm:pt-0 md:w-1/2  md:ms-auto md:ps-14;
} */
.timeline-pointer {
  @apply absolute inset-0 left-7 h-4 w-4 transform rotate-45 bg-white sm:top-10 sm:left-20 sm:ms-2 md:left-10;
}

/* .timeline-container-left {
  @apply md:ms-0 md:ps-0 md:pe-14 md:me-auto;
} */

/* .timeline-pointer-left {
  @apply md:left-auto md:right-12;
} */
</style>
