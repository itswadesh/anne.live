export default ({ app }, inject) => {
  const client = app.apolloProvider.clients.defaultClient
  inject('get', async (gql, variables = {}) => {
    const n = gql.lastIndexOf('/')
    const endPoint = gql.substring(n + 1)
    const query = require(`~/gql/${gql}.gql`)
    variables.store = app.store.state.store && app.store.state.store.id
    const settings = app.store.state.settings && app.store.state.settings
    if (!variables.store && settings && settings.isMultiStore) {
      variables.store = '23sdf43rfs5fdgsdf'
      throw new Error('Store not found')
    }
    const res = (
      await client.query({
        query,
        variables,
      })
    ).data[endPoint]
    return res
  })
  inject('post', async (gql, variables = {}) => {
    const mutation = require(`~/gql/${gql}.gql`)
    const n = gql.lastIndexOf('/')
    const endPoint = gql.substring(n + 1)
    variables.store = app.store.state.store && app.store.state.store.id
    const res = (
      await client.mutate({
        mutation,
        variables,
      })
    ).data[endPoint]
    return res
  })
}
