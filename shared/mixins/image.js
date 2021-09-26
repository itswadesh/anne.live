import { mapMutations } from 'vuex'
import { Submit } from '~/shared/components/ui'
export default {
  data() {
    return {
      image: '',
    }
  },
  components: { Submit },
  methods: {
    ...mapMutations({
      clearErr: 'clearErr',
      setErr: 'setErr',
      success: 'success',
      busy: 'busy',
    }),
    imgPath(i) {
      return `${i}?a=${Math.random()}`
    },
    async saveImage(name, image) {
      try {
        this.settings[name] = image
        await this.save(this.settings) // Save the image against settings
      } catch (e) {
        this.setErr(e)
      }
    },
    removeImage(name) {
      this.settings[name] = ''
      this.save(this.settings)
    },
  },
}
