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
        'https://us-central1-search-by-clients-group.cloudfunctions.net/app/check-group' +
        `?doc=${customerDoc}`
      )
        .then(({ data }) => {
          if (data.hasGroup) {
            window.checkedGroupDoc = customerDoc
            window.sessionStorage.setItem('isGroup', 1)
            window.sessionStorage.setItem('specSearch', JSON.stringify(data))
            window.EcomSearch.dslMiddlewares.push((dsl) => {
              dsl.query.bool.filter.push({
                  "term": {
                    "specs.grid": data.spec
                  }
              })
              dsl.query.bool.filter.push({
                "terms": {
                  "specs.text": [
                    data.value
                  ]
                }
              })
            })
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
