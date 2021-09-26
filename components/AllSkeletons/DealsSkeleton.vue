<template>
  <VueSlickCarousel v-bind="settings">
    <div class="flex flex-col w-1/2 m-2 animate-pulse lg:w-1/5 md:w-1/4">
      <span
        class="
          flex flex-col
          h-40
          mx-2
          bg-gray-300
          lg:h-64
          md:h-56
          rounded-t-2xl
        "
      ></span>
      <span class="flex flex-col mx-2 bg-gray-300 rounded-b-2xl">
        <div class="w-11/12 h-4 m-1 mx-auto bg-gray-100"></div>
        <div class="w-1/3 h-4 m-1 mx-auto bg-gray-100"></div>
        <div class="w-1/2 h-4 m-1 mx-auto bg-gray-100"></div>
      </span>
    </div>
    <div class="flex flex-col w-1/2 m-2 animate-pulse lg:w-1/5 md:w-1/4">
      <span
        class="
          flex flex-col
          h-40
          mx-2
          bg-gray-300
          lg:h-64
          md:h-56
          rounded-t-2xl
        "
      ></span>
      <span class="flex flex-col mx-2 bg-gray-300 rounded-b-2xl">
        <div class="w-11/12 h-4 m-1 mx-auto bg-gray-100"></div>
        <div class="w-1/3 h-4 m-1 mx-auto bg-gray-100"></div>
        <div class="w-1/2 h-4 m-1 mx-auto bg-gray-100"></div>
      </span>
    </div>
    <div class="flex flex-col w-1/2 m-2 animate-pulse lg:w-1/5 md:w-1/4">
      <span
        class="
          flex flex-col
          h-40
          mx-2
          bg-gray-300
          lg:h-64
          md:h-56
          rounded-t-2xl
        "
      ></span>
      <span class="flex flex-col mx-2 bg-gray-300 rounded-b-2xl">
        <div class="w-11/12 h-4 m-1 mx-auto bg-gray-100"></div>
        <div class="w-1/3 h-4 m-1 mx-auto bg-gray-100"></div>
        <div class="w-1/2 h-4 m-1 mx-auto bg-gray-100"></div>
      </span>
    </div>
    <div class="flex flex-col w-1/2 m-2 animate-pulse lg:w-1/5 md:w-1/4">
      <span
        class="
          flex flex-col
          h-40
          mx-2
          bg-gray-300
          lg:h-64
          md:h-56
          rounded-t-2xl
        "
      ></span>
      <span class="flex flex-col mx-2 bg-gray-300 rounded-b-2xl">
        <div class="w-11/12 h-4 m-1 mx-auto bg-gray-100"></div>
        <div class="w-1/3 h-4 m-1 mx-auto bg-gray-100"></div>
        <div class="w-1/2 h-4 m-1 mx-auto bg-gray-100"></div>
      </span>
    </div>
  </VueSlickCarousel>
</template>

<script>
export default {
  data() {
    return {
      settings: {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 2,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: false,
            },
          },
          {
            breakpoint: 600,
            settings: {
              centerMode: true,
              centerPadding: '120px',
              centerMargin: '20px',
              slidesToScroll: 1,
              focusOnSelect: true,
              infinite: false,
              slidesToShow: 1,
            },
          },
          {
            breakpoint: 480,
            settings: {
              centerMode: true,
              centerPadding: '60px',
              centerMargin: '15px',
              slidesToScroll: 1,
              focusOnSelect: true,
              infinite: false,
              slidesToShow: 1,
            },
          },
        ],
      },
    }
  },
}
</script>
