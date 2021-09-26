<template>
  <div>
    <div class="range-slider">
      <span
        >from
        <input
          v-model.number="rangeS0"
          type="number"
          :min="min"
          :max="max"
          @change="onChange" />
        to
        <input
          v-model.number="rangeS1"
          type="number"
          :min="min"
          :max="max"
          @change="onChange"
      /></span>
      <input
        v-model.number="rangeS0"
        :min="min"
        :max="max"
        :step="step"
        type="range"
        @change="onChange"
      />
      <input
        v-model.number="rangeS1"
        :min="min"
        :max="max"
        :step="step"
        type="range"
        @change="onChange"
      />
      <svg width="100%" height="24">
        <line
          x1="4"
          y1="0"
          x2="300"
          y2="0"
          stroke="#444"
          stroke-width="12"
          stroke-dasharray="1 28"
        ></line>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    range0: { type: Number, default: 0 },
    range1: { type: Number, default: 10 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100000 },
    step: { type: Number, default: 1 },
  },
  data() {
    return {
      numberS: [],
      rangeS0: 0,
      rangeS1: 1,
    }
  },
  computed: {},
  mounted() {
    const parent = document.querySelector('.range-slider')
    if (!parent) return false
    this.rangeS0 = this.range0
    this.rangeS1 = this.range1
    // const rangeS = parent.querySelectorAll('input[type=range]')

    // rangeS.forEach(function (el) {
    //   el.oninput = function () {}
    // })
  },
  methods: {
    onChange() {
      let slide1 = parseFloat(this.rangeS0)
      let slide2 = parseFloat(this.rangeS1)
      if (slide1 > slide2) {
        ;[slide1, slide2] = [slide2, slide1]
      }

      this.numberS[0] = slide1
      this.numberS[1] = slide2
      this.$emit('changed', this.numberS)
    },
  },
}
</script>

<style scoped>
body {
  display: flex;
  height: 100vh;
}
input {
  box-shadow: 0;
  outline: 0;
}
.range-slider {
  width: 300px;
  margin: auto;
  text-align: center;
  position: relative;
  height: 6em;
}
.range-slider svg,
.range-slider input[type='range'] {
  position: absolute;
  left: 0;
  bottom: 0;
}
input[type='number'] {
  border: 1px solid #ddd;
  text-align: center;
  -moz-appearance: textfield;
}
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type='number']:invalid,
input[type='number']:out-of-range {
  border: 2px solid #ff6347;
}
input[type='range'] {
  -webkit-appearance: none;
  width: 100%;
}
input[type='range']:focus {
  outline: none;
}
input[type='range']:focus::-webkit-slider-runnable-track {
  background: #2497e3;
}
input[type='range']:focus::-ms-fill-lower {
  background: #2497e3;
}
input[type='range']:focus::-ms-fill-upper {
  background: #2497e3;
}
input[type='range']::-webkit-slider-runnable-track {
  width: 100%;
  height: 5px;
  cursor: pointer;
  animate: 0.2s;
  background: #2497e3;
  border-radius: 1px;
  box-shadow: none;
  border: 0;
}
input[type='range']::-webkit-slider-thumb {
  z-index: 2;
  position: relative;
  box-shadow: 0px 0px 0px #000;
  border: 1px solid #2497e3;
  height: 18px;
  width: 18px;
  border-radius: 25px;
  background: #a1d0ff;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -7px;
}
input[type='range']::-moz-range-track {
  width: 100%;
  height: 5px;
  cursor: pointer;
  animate: 0.2s;
  background: #2497e3;
  border-radius: 1px;
  box-shadow: none;
  border: 0;
}
input[type='range']::-moz-range-thumb {
  z-index: 2;
  position: relative;
  box-shadow: 0px 0px 0px #000;
  border: 1px solid #2497e3;
  height: 18px;
  width: 18px;
  border-radius: 25px;
  background: #a1d0ff;
  cursor: pointer;
}
input[type='range']::-ms-track {
  width: 100%;
  height: 5px;
  cursor: pointer;
  animate: 0.2s;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type='range']::-ms-fill-lower,
input[type='range']::-ms-fill-upper {
  background: #2497e3;
  border-radius: 1px;
  box-shadow: none;
  border: 0;
}
input[type='range']::-ms-thumb {
  z-index: 2;
  position: relative;
  box-shadow: 0px 0px 0px #000;
  border: 1px solid #2497e3;
  height: 18px;
  width: 18px;
  border-radius: 25px;
  background: #a1d0ff;
  cursor: pointer;
}
</style>
