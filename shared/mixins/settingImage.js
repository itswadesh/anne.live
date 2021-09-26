import { Submit } from '~/shared/components/ui'
export default {
  data() {
    return {
      image: '',
    }
  },
  components: { Submit },
  methods: {
    imgPath(i) {
      return `${i}?a=${Math.random()}`
    },
    saveImage(name, image) {
      try {
        this.settings[name] = image
        this.save(this.settings) // Save the image against settings
      } catch (e) {
        this.$store.commit('setErr', e)
      }
    },
    removeImage(name) {
      this.settings[name] = ''
      this.save(this.settings)
    },
  },
}
