import { ref } from "@vue/reactivity"
import {projectFirestore} from  "../firebase/config.js"
// const useCollection =(collection)=>{
//     const error = ref(null);
//     const addDoc = async (doc)=>{
//         error.value = null;
//         try {
//             await projectFirestore.collection(collection).add(doc)
//         } catch (err) {
//             console.loh(err.message);
//             error.value = "could not send the message!!"
//         }
//     }
//     return { error, addDoc}
// }
// export default useCollection
// const error = ref(null);
const addDoc = async (collection, doc)=>{
    console.log(collection, doc);
    // error.value = null;
    // try {
    //     await projectFirestore.collection(collection).add(doc)
    // } catch (err) {
    //     console.loh(err.message);
    //     // error.value = "could not send the message!!"
    // }
}
export default addDoc