import { createStore } from 'vuex'
import user from "./modules/user.js"
import auth from "./modules/auth.js"
export default createStore({
  modules: {
    auth,
    user
  }
})