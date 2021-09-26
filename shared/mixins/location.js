import { mapGetters, mapMutations } from 'vuex'
import GET_LOCATION from '~/gql/location/getLocation.gql'

export default {
  data() {
    return {}
  },
  computed: { ...mapGetters({ settings: 'settings' }) },
  mounted() {
    // let recaptchaScript = document.createElement('script')
    // recaptchaScript.setAttribute(
    //   'src',
    //   'https://maps.googleapis.com/maps/api/js?key=' + GOOGLE_MAPS_KEY
    // )
    // document.head.appendChild(recaptchaScript)
  },
  methods: {
    ...mapMutations({ setErr: 'setErr', busy: 'busy' }),
    drawBoundries() {
      const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 18.8561, lng: 82.7347 },
        zoom: 12,
      })

      const triangleCoords = [
        { lat: 18.849335, lng: 82.734222 },
        { lat: 18.827176, lng: 82.975917 },
        { lat: 18.357822, lng: 82.724857 },
        { lat: 18.456663, lng: 82.964658 },
        { lat: 18.795072, lng: 82.228701 },
        { lat: 19.100792, lng: 82.267496 },
      ]
      const point = new google.maps.LatLng(18.8561, 82.7347)
      const bermudaTriangle = new google.maps.Polygon({ paths: triangleCoords })

      google.maps.event.addListener(map, 'click', function (e) {
        // console.log(e)
        const resultColor = google.maps.geometry.poly.containsLocation(
          point,
          bermudaTriangle
        )
        // console.log(resultColor)
      })
    },
    pinLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          this.showPosition,
          this.showError
        )
      } else {
        this.setErr('Geolocation is not supported by this browser.')
      }
    },
    showPosition(pos) {
      const position = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      }
      // var position = new google.maps.LatLng(18.732081, 82.830031);
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: position,
      })
      const marker = new google.maps.Marker({ position, map })
    },
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
    async locateMe(l) {
      if (l) {
        try {
          // let location = l.coords
          // const location = (await this.getLocation()).coords; // Location accuracy is too bad shows Anugul
          this.clearErr()
          const g = await this.$get('location/getLocation', {
            lat: l.lat,
            lng: l.lng,
          })
          // const g = (
          //   await this.$apollo.query({
          //     query: GET_LOCATION,
          //     variables: { lat: l.lat, lng: l.lng },
          //     fetchPolicy: 'no-cache',
          //   })
          // ).data.getLocation
          const geo = {
            district: g.district,
            city: g.city,
            state: g.state,
            zip: g.zip,
            coords: { lat: l.lat, lng: l.lng },
          }
          // console.log('Geo...', geo)
          this.$cookies.set('geo', geo, {
            path: '/',
            maxAge: this.settings.locationExpiry,
          })
          return geo
        } catch (e) {
          this.setErr(e.message)
          return null
        } finally {
          this.busy(false)
        }
      }
    },
    showInMap(pos) {
      const position = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      }
      // var position = new google.maps.LatLng(18.732081, 82.830031);
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: position,
      })
      const marker = new google.maps.Marker({ position, map })
    },
    getLiveLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition)
      } else {
        // console.log('Geolocation is not supported by this browser.')
      }
    },
    showError(error) {
      let err = null
      switch (error.code) {
        case error.PERMISSION_DENIED:
          err = 'User denied the request for Geolocation.'
          break
        case error.POSITION_UNAVAILABLE:
          err = 'Location information is unavailable.'
          break
        case error.TIMEOUT:
          err = 'The request to get user location timed out.'
          break
        case error.UNKNOWN_ERROR:
          err = 'An unknown error occurred.'
          break
      }
      this.setErr(err)
    },
  },
}
