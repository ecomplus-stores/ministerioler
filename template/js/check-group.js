import ecomCart from '@ecomplus/shopping-cart'
import ecomPassport from '@ecomplus/passport-client'
import { debounce } from 'perfect-debounce'

export default (isCheckout = false) => {
  const checkGroup = debounce(() => {
    const customerDoc = ecomPassport.getCustomer().doc_number
    /* window.checkedGroupDoc = customerDoc
    window.sessionStorage.setItem('isGroup', 1) */
    if (customerDoc && customerDoc !== window.checkedGroupDoc) {
      window.axios.get(
        'groupCheckhttps://us-central1-search-by-clients-group.cloudfunctions.net/app/check-group' +
        `?doc=${customerDoc}`
      )
        .then(({ data }) => {
          if (data.hasBazipass) {
            window.checkedGroupDoc = customerDoc
            window.sessionStorage.setItem('isGroup', 1)
            window.dispatchEvent(new Event('bazipassCheck'))
          }
        })
        .catch(console.error)
    }
  }, 400)
  ecomPassport.on('change', checkGroup)
  if (ecomPassport.checkLogin()) {
    checkGroup()
  }
}
