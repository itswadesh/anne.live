export default {
  data: () => ({
    count: 0,
    noOfPages: 1,
    currentPage: 1,
    pageSize: 0,
  }),
  methods: {
    changePage(p) {
      const query = { ...this.$route.query }
      query.page = p
      this.$router.push({ query })
    },
  },
}
