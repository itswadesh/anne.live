<template>
  <div class="container flex flex-col w-full mx-auto lg:flex-row">
    <div class="flex flex-col w-full me-4 lg:w-3/4">
      <div class="bg-gray-100 rounded">
        <div
          class="
            container
            flex flex-row
            h-40
            bg-gray-200
            border border-white
            rounded
          "
        >
          <span class="w-1/3 h-32 m-1 my-auto bg-gray-100 md:w-1/6"></span>
          <span class="relative w-5/6">
            <div class="w-2/3 h-6 m-2 bg-gray-100"></div>
            <div class="w-1/6 h-6 m-2 bg-gray-100"></div>
            <div class="absolute bottom-0 flex flex-row">
              <div class="w-6 h-6 m-2 bg-gray-100 rounded-full"></div>
              <div class="w-6 h-6 m-2 mx-1 bg-gray-100 rounded"></div>
              <div class="w-6 h-6 m-2 bg-gray-100 rounded-full"></div>
              <div class="w-6 h-6 m-2 mx-2 bg-gray-100 rounded"></div>
            </div>
          </span>
        </div>
      </div>
    </div>
    <div class="w-full h-64 mt-4 bg-gray-200 rounded lg:w-1/4 lg:mt-0"></div>
  </div>
</template>
