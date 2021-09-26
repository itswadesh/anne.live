import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      errorStr: '',
      gettingLocation: false,
      geo: null,
      location: { latitude: '', longitude: '' },
    }
  },
  methods: {
    ...mapMutations({ info: 'info', busy: 'busy' }),
    getLocation() {
      return new Promise((resolve, reject) => {
        if (!('geolocation' in navigator)) {
          reject(new Error('Geolocation is not available.'))
        }

        navigator.geolocation.getCurrentPosition(
          (pos) => {
            resolve(pos)
          },
          (err) => {
            reject(err)
          }
        )
      })
    },
    async locateMe() {
      let geo = this.$cookies.get('geo')
      if (!geo && process.client) {
        this.busy(true)
        try {
          this.busy(false)
          const location = (await this.getLocation()).coords
          geo = await this.$axios.$get(
            //   `/api/geo/location?lat=${location.latitude}&lng=${location.longitude}`
            `/api/geo/location?lat=18.722615&lng=82.839649`
          )
          geo.coords = { lat: location.latitude, lng: location.longitude }
          // console.log("Geo...", geo);
          this.$cookies.set('geo', geo, { path: '/' })
          return geo
        } catch (e) {
          this.busy(false)
          this.info(e.message)
          return null
        }
      } else {
        return geo
      }
    },
    showInMap(pos) {
      const latlon = pos.coords.latitude + ',' + pos.coords.longitude
      const imgUrl =
        'https://maps.googleapis.com/maps/api/staticmap?center=' +
        latlon +
        '&zoom=14&size=400x300&sensor=false&key=YOUR_:KEY'
      const map = document.querySelector('mapholder')
      map.innerHTML = "<img src='" + imgUrl + "'>"
    },
  },
}
