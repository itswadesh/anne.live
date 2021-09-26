<template>
  <ul class="bg-brand-700 circles">
    <li v-if="Math.floor(rating) > 0" class="full"></li>
    <li v-if="Math.floor(rating) > 1" class="full"></li>
    <li v-if="Math.floor(rating) > 2" class="full"></li>
    <li v-if="Math.floor(rating) > 3" class="full"></li>
    <li v-if="Math.floor(rating) > 4" class="full"></li>
    <li v-if="rem >= '0.5'" class="half"></li>
    <li v-if="diff > 0"></li>
    <li v-if="diff > 1"></li>
    <li v-if="diff > 2"></li>
    <li v-if="diff > 3"></li>
    <li v-if="diff > 4"></li>
  </ul>
</template>
<script>
export default {
  props: {
    rating: { type: String, default: null },
  },
  computed: {
    rem() {
      return this.rating % 1
    },
    diff() {
      if (this.rating % 1 > 0.49) {
        return 4 - Math.floor(this.rating)
      } else {
        return 5 - Math.floor(this.rating)
      }
    },
  },
}
</script>
<style scoped>
.circles {
  display: inline-block;
  padding: 0;
  padding-left: 0 !important;
}

.circles li {
  position: relative;
  display: inline-block;
  width: 15px;
  height: 15px;
  padding: 2px;
  border-radius: 50%;
  list-style: none;
  border: 2px solid #88af29;
  overflow: hidden;
}

.circles li.full:before {
  content: '';
  display: inline-block;
  background: #88af29;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  vertical-align: top;
}

.circles li.half:before {
  content: '';
  display: inline-block;
  background: #88af29;
  width: 100%;
  height: 100%;
  margin-left: -50%;
  vertical-align: top;
}

.circles li.halfy:before {
  content: '';
  display: block;
  width: 5px;
  height: 7px;
  background-color: #88af29;
  border-top-left-radius: 50%;
  border-bottom-left-radius: 50%;
  border: 2x solid gray;
  border-right: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.circles li:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid #fff;
  border-radius: 50%;
}
</style>
