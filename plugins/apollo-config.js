export default ({ $config: { WWW_URL, HTTP_ENDPOINT } }) => {
  return {
    httpEndpoint: `${WWW_URL}/graphql`,
    browserHttpEndpoint: '/graphql',
    // wsEndpoint: `${HTTP_ENDPOINT.replace('http', 'ws')}/graphql`,
  }
}
