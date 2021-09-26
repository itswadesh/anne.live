export default {
  hasRole: (state) => (role) => {
    return state.user
      ? state.roles.indexOf(state.user.role) >= state.roles.indexOf(role)
      : false
  },
  user: (state) => {
    return state.user
  },
}
