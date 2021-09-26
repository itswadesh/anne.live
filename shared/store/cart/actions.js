import CART from '~/gql/cart/cart.gql'
import ADD_TO_CART from '~/gql/cart/addToCart.gql'
import CLEAR_CART from '~/gql/cart/clearCart.gql'
import CHECKOUT from '~/gql/cart/checkout.gql'
import APPLY_COUPON from '~/gql/cart/applyCoupon.gql'
import REMOVE_COUPON from '~/gql/cart/removeCoupon.gql'
import CASHFREE_PAY_NOW from '~/gql/pay/cashfreePayNow.gql'
import RAZORPAY from '~/gql/pay/razorpay.gql'
import CAPTURE_PAY from '~/gql/pay/capturePay.gql'
import VALIDATE_CART from '~/gql/cart/validateCart.gql'

export default {
  async fetch({ commit, state, getters }, slug) {
    try {
      commit('clearErr', null, { root: true })
      const data = (
        await this.app.apolloProvider.defaultClient.query({
          query: CART,
          fetchPolicy: 'no-cache',
        })
      ).data.cart
      // console.log(data, 'cart datat')
      commit('setCart', data)
      return data
    } catch (e) {
      commit('setErr', e, { root: true })
    } finally {
      commit('busy', false, { root: true })
    }
  },
  async clear({ commit, state, getters }) {
    try {
      commit('clearErr', null, { root: true })
      const data = (
        await this.app.apolloProvider.defaultClient.mutate({
          mutation: CLEAR_CART,
        })
      ).data.clearCart
      commit('setCart', {}) // can not pass null else clear cart request will be rejected
      return data
    } catch (e) {
      commit('setErr', e, { root: true })
    } finally {
      commit('busy', false, { root: true })
    }
  },
  async addToCart({ commit }, payload) {
    if (typeof payload.options !== 'string')
      payload.options = JSON.stringify(payload.options)
    try {
      // commit('clearErr', null, { root: true })
      const data = (
        await this.app.apolloProvider.defaultClient.mutate({
          mutation: ADD_TO_CART,
          variables: payload,
        })
      ).data.addToCart
      commit('setCart', data)
    } catch (e) {
      commit('setErr', e, { root: true })
      throw e
    } finally {
      // commit('busy', false, { root: true })
    }
  },
  async removeCoupon({ commit }, payload) {
    try {
      commit('clearErr', null, { root: true })
      commit('busy', true, { root: true })
      const data = (
        await this.app.apolloProvider.defaultClient.mutate({
          mutation: REMOVE_COUPON,
          variables: payload,
        })
      ).data.removeCoupon
      commit('setCart', data)
    } catch (err) {
      commit('setErr', err, { root: true })
    } finally {
      commit('busy', false, { root: true })
    }
  },
  async applyCoupon({ commit }, payload) {
    try {
      commit('clearErr', null, { root: true })
      const data = (
        await this.app.apolloProvider.defaultClient.mutate({
          mutation: APPLY_COUPON,
          variables: payload,
        })
      ).data.applyCoupon
      if (data && data.discount.amount > 0) {
        commit('setCart', data)
        commit('success', 'Coupon applied successfully', { root: true })
      } else {
        throw new Error('Not enough quantity')
      }
      // this.$router.push('/cart')
    } catch (e) {
      commit('setErr', e, { root: true })
      throw e
    } finally {
      commit('busy', false, { root: true })
    }
  },
  async checkout(
    { commit, state, rootState, getters },
    { paymentMethod, address }
  ) {
    paymentMethod = paymentMethod || 'COD'
    switch (paymentMethod) {
      case 'COD':
        try {
          commit('busy', true, { root: true })
          if (!address) {
            commit('setErr', 'Address not provided.', { root: true })
            return
          }
          // delete address.__typename
          // delete address.createdAt
          // delete address.updatedAt
          // if (address.coords) delete address.coords.__typename
          const order = (
            await this.app.apolloProvider.defaultClient.mutate({
              mutation: CHECKOUT,
              variables: {
                address,
                paymentMethod,
              },
            })
          ).data.checkout
          this.$router.push(`/payment/success?id=${order.id}&provider=COD`)
        } catch (err) {
          commit('setErr', err, { root: true })
          // this.$router.push(
          //   `/payment/failed?provider=COD`
          // )
        } finally {
          commit('busy', false, { root: true })
        }
        break
      case 'Stripe':
        commit('setErr', 'Stripe not implemented yet. Proceed with COD', {
          root: true,
        })
        break
      case 'Razorpay':
        const vm = this
        vm.loading = true
        // vm.address.zip = +vm.address.zip
        commit('clearErr', null, { root: true })
        const vc = (
          await this.app.apolloProvider.defaultClient.query({
            query: VALIDATE_CART,
          })
        ).data.validateCart
        const rp = (
          await this.app.apolloProvider.defaultClient.mutate({
            mutation: RAZORPAY,
            variables: { address },
          })
        ).data.razorpay
        const apollo = this.app.apolloProvider.defaultClient
        const options = {
          key: rp.key_id, // The Key ID generated from the Razorpay Dashboard
          name: rootState.settings.websiteName,
          description: 'Payment for Shopping',
          image: '/icon.png',
          amount: rp.amount,
          order_id: rp.id,
          async handler(response) {
            try {
              vm.loading = true
              const capture = (
                await apollo.mutate({
                  mutation: CAPTURE_PAY,
                  variables: {
                    paymentId: response.razorpay_payment_id,
                    oid: response.razorpay_order_id,
                  },
                })
              ).data.capturePay
              // vm.clearCart()
              if (capture)
                vm.$router.push(
                  `/payment/success?id=${capture.id}&provider=Razorpay`
                )
              else vm.$router.push(`/payment/failed?provider=Razorpay`)
            } catch (e) {
              // console.log('Razorpay Err::: ', e)
              vm.$router.push(`/payment/failed?provider=Razorpay`)
            } finally {
              vm.loading = false
            }
          },
          prefill: {
            name: `${this.user && this.user.firstName} ${
              this.user && this.user.lastName
            }`,
            phone: this.user && this.user.phone,
            email: (this.user && this.user.email) || 'support@litekart.in',
            contact: this.user && this.user.phone,
          },
          notes: {
            address: 'note value',
          },
          theme: {
            color: '#F37254',
          },
        }
        return options
      case 'Cashfree':
        try {
          commit('clearErr', null, { root: true })
          const cashFreePayload = (
            await this.app.apolloProvider.defaultClient.mutate({
              mutation: CASHFREE_PAY_NOW,
              variables: { address },
            })
          ).data.cashfreePayNow
          if (!cashFreePayload) {
            commit('setErr', 'CashFree not available', {
              root: true,
            })
            break
          }
          const url = cashFreePayload.url
          delete cashFreePayload.__typename
          delete cashFreePayload.url
          delete cashFreePayload.token
          const formI = document.createElement('form')
          formI.setAttribute('id', 'cashfreeForm')
          formI.setAttribute('action', url)
          formI.setAttribute('method', 'POST')
          formI.setAttribute('style', 'display:none;')
          if (cashFreePayload !== null) {
            for (const [key, value] of Object.entries(cashFreePayload)) {
              if (value !== null) {
                const input = document.createElement('input')
                input.setAttribute('type', 'hidden')
                input.setAttribute('name', key)
                input.value = value
                formI.append(input)
              }
            }
          }
          document.querySelector('body').append(formI)
          formI.submit()
          formI.remove()
        } catch (e) {
          commit('setErr', e, { root: true })
          break
        }
        break
      default:
        commit(
          'setErr',
          'The checkout service ' + paymentMethod + ' not yet implemented',
          { root: true }
        )
        // console.log('Unknown checkout service: ' + paymentMethod)
        break
    }
  },
}
