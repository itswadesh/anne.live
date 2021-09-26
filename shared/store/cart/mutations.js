export default {
  setPromo(state, data) {
    state.promo = data.details
    state.total = data.amount
  },
  clear(state, data) {
    state.items = []
    state.qty = 0
    state.subtotal = 0
    state.total = 0
    state.discount = {}
    state.tax = {}
    state.shipping = {}
  },
  setCart(state, data) {
    if (!data) data = {}
    state.items = data.items || []
    state.qty = data.qty
    state.discount = data.discount || 0
    state.tax = data.tax
    state.subtotal = data.subtotal
    state.total = data.total
    state.shipping = data.shipping
  },
  toggleCart(state, payload) {
    state.showCart = payload
  },
  applyDiscount(state, amount) {
    state.discount = amount
  },
}
