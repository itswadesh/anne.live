export default {
  cart: (state) => {
    return state
  },
  showCart(state) {
    return state.showCart
  },
  checkCart:
    (state) =>
    ({ pid, vid, options }) => {
      // Returns true when there is item in cart
      const found = state.items.some(function (el) {
        const pv = el.pid === pid
        const o = JSON.parse(el.options)
        let matched = true
        for (const k in o) {
          // console.log('oooooooooo', k, o[k], options[k])
          if (o[k] !== options[k]) {
            matched = false
            continue
          }
        }
        return pv && matched
      })
      return found
    },
  getItemQty:
    (state) =>
    ({ pid, vid, options }) => {
      // Gets cart qty of that item
      for (const i of state.items) {
        const io = JSON.parse(i.options)
        if (i.pid === pid) {
          // When current product is matched, further match options //  && i.vid === vid // vid matching not required
          let matched = 0
          for (const k in options) {
            if (io[k] === options[k]) {
              matched++
            }
          }
          const size = Object.keys(options).length
          if (matched === size) return i.qty
        }
      }
      return 0
    },
}
