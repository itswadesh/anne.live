export default {
  data: () => ({
    sortBy: '',
    descending: false,
  }),
  methods: {
    sort(pr) {
      this.flush()
      this.descending = !this.descending
      if (this.descending) {
        pr = '-' + pr
      }
      const query = { ...this.$route.query }
      query.sort = pr
      this.$router.push({ query })
    },
  },
}
