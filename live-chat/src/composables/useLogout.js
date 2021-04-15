import { ref } from "vue";
import {projectAuth} from "../firebase/config";
// import firebase_1 from "../firebase/config.js"

const error = ref(null);
const logout = async () => {
  error.value = null;
  try {
    await projectAuth.signOut();
  } catch (err) {
    console.log(err.message);
    error.value = err.message;
  }
};
const useLogout = () => {
  return { error, logout };
};
export default useLogout;
//