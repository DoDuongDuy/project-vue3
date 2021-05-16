import { createStore } from 'vuex'
import doc from "./modules/doc.js"
import auth from "./modules/auth.js"
export default createStore({
  modules: {
    auth,
    doc
  }
})