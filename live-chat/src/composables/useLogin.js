import { ref } from "@vue/reactivity";
import { projectAuth } from "../firebase/config.js";
const error = ref(null);
const login = async (form) => {
  error.value = null;
  try {
    const res = await projectAuth.signInWithEmailAndPassword(form.email, password);
    error.value = null;
    // console.log(res);

    return res; 
  } catch (err) {
    console.log(error.message);
    error.value = err.message;
  }
};
const useLogin = () => {
  return { error, login };
};
export default useLogin
