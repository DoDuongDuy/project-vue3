import { ref } from "@vue/reactivity";
import {projectAuth} from "../firebase/config.js"
const user = ref();
projectAuth.onAuthStateChanged(user_ =>{
    user.value = user_;
})
const getUser =()=>{
    return {user}
}
export default getUser;