<template>
  <section
    class="
      relative
      max-h-screen max-w-screen
      text-white
      overflow-hidden
      bg-black
    "
  >
    <!-- Live video section start  -->
    <div class="h-screen max-w-sm mx-auto">
      <!-- v-lazy="video.snapshotUrl" -->
      <img
        src="/live/hi.png"
        alt=""
        class="
          border-4 border-white
          h-full
          w-full
          object-cover object-top
          bg-gray-300
        "
      />
    </div>
    <!-- Live video section start  -->

    <!-- Absolute position div start  -->
    <div class="absolute inset-0 p-4 grad flex flex-col justify-between">
      <div class="flex items-start justify-between">
        <!-- Details section start  -->
        <div class="flex-1">
          <div
            class="
              max-w-max
              text-xs
              font-medium
              uppercase
              px-4
              py-1
              rounded-full
              border border-white
            "
          >
            Event
          </div>

          <div class="mt-2 font-medium leading-tight">
            <h5>Pratap Chandra Maharana</h5>
            <h5>Anne live Debut-</h5>
            <h5>Sunday July 18th 2PM PST</h5>
          </div>
        </div>
        <!-- Details section end -->

        <!-- Button section start -->

        <div class="ms-5">
          <button
            class="
              h-10
              w-10
              flex
              items-center
              justify-center
              bg-black bg-opacity-50
              rounded-full
              focus:outline-none
            "
          >
            <!-- @click="exit" -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <button
            class="
              mt-2
              h-10
              w-10
              flex
              items-center
              justify-center
              bg-black bg-opacity-50
              rounded-full
              focus:outline-none
            "
          >
            <!-- @click="share" -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          </button>

          <button
            class="
              mt-2
              h-10
              w-10
              flex
              items-center
              justify-center
              rounded-full
              focus:outline-none
            "
            :class="mute ? 'bg-white' : 'bg-black bg-opacity-50'"
            @click="mute = !mute"
          >
            <svg
              v-if="!mute"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                clip-rule="evenodd"
              />
            </svg>

            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-800"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
        <!-- Button section end -->
      </div>

      <!-- Chatting section start  -->
      <div class="md:w-1/3">
        <!-- Chat start  -->
        <div
          class="
            max-h-60
            w-2/3
            md:w-full
            overflow-y-auto overflow-hidden
            flex-1
            fade
          "
        >
          <div
            v-for="(c, cx) in chats"
            :key="cx"
            class="mb-3 flex items-start justify-start"
          >
            <img
              :src="c.img"
              class="
                h-8
                w-8
                rounded-full
                object-cover object-top
                bg-white
                flex-shrink-0
                me-2
              "
            />
            <div class="flex-1">
              <h6 class="text-sm font-medium w-36 truncate">
                {{ c.name }}
              </h6>
              <p class="mt-0.5 text-xs font-light">{{ c.message }}</p>
            </div>
          </div>
        </div>

        <!-- Chat end  -->
        <!-- Say something start  -->
        <div class="mt-2 relative">
          <input
            type="text"
            class="
              bg-black bg-opacity-50
              rounded-full
              w-full
              py-2
              px-4
              placeholder-white
              focus:ring-0 focus:ring-offset-0 focus:border-white
            "
            placeholder="Say something..."
          />

          <button
            class="
              absolute
              right-0
              inset-y-0
              m-2
              bg-primary-500 bg-opacity-50
              h-6
              w-6
              rounded-full
              flex
              items-center
              justify-center
              focus:outline-none
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 11l5-5m0 0l5 5m-5-5v12"
              />
            </svg>
          </button>
        </div>
        <!-- Say something end -->
      </div>
      <!-- Chatting section end -->
    </div>
    <!-- Absolute position div end -->
  </section>
</template>

<script>
export default {
  layout: 'none',
  data() {
    return {
      props: {
        video: {
          type: Object,
          default: null,
        },
      },

      mute: false,

      chats: [
        {
          img: '/live/hi.png',
          name: 'Pratap Chandra Maharana',
          message: 'Hey! Good afternoon 👋',
        },
        {
          img: '/live/hi.png',
          name: 'Swadesh Behera',
          message: 'Hellow',
        },
        {
          img: '/live/hi.png',
          name: 'Pratap Chandra Maharana',
          message: 'Lorem ipsum dolor sit amet consectetur',
        },
        {
          img: '/live/hi.png',
          name: 'Swadesh Behera',
          message: 'Lorem ipsum dolor sit amet consectetur',
        },
        {
          img: '/live/hi.png',
          name: 'Pratap Chandra Maharana',
          message: 'Lorem ipsum dolor sit amet consectetur',
        },
        {
          img: '/live/hi.png',
          name: 'Swadesh Behera',
          message: 'Lorem ipsum dolor sit amet consectetur',
        },
        {
          img: '/live/hi.png',
          name: 'Pratap Chandra Maharana',
          message: 'Lorem ipsum dolor sit amet consectetur',
        },
        {
          img: '/live/hi.png',
          name: 'Swadesh Behera',
          message: 'Lorem ipsum dolor sit amet consectetur',
        },
      ],
    }
  },

  head() {
    return {
      title: 'Mobile Live',
    }
  },
}
</script>

<style scoped>
.grad {
  background-image: radial-gradient(
    transparent,
    transparent,
    rgba(0, 0, 0, 0.5)
  );
}

.fade {
  -webkit-mask-image: linear-gradient(to top, black 50%, transparent 100%);
  mask-image: linear-gradient(to top, black 50%, transparent 100%);
}

::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  --tw-divide-opacity: 1;
  border-color: rgba(209, 213, 219, var(--tw-divide-opacity));
}

/* Handle */
::-webkit-scrollbar-thumb {
  --tw-divide-opacity: 1;
  border-color: rgba(209, 213, 219, var(--tw-divide-opacity));
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  --tw-divide-opacity: 1;
  border-color: rgba(209, 213, 219, var(--tw-divide-opacity));
}
</style>
