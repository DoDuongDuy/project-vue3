import { ref } from "@vue/reactivity"
import {projectFirestore} from "../firebase/config.js";
const getCollection=(collection)=>{
    const error = ref(null);
    const documents = ref(null);
    let collectionref = projectFirestore.collection(collection).orderBy("createAt");
    collectionref.onSnapshot((snap) => {
        let results = [];
        snap.docs.forEach(doc => {
            doc.data().createAt && results.push({...doc.data(), id : doc.id})
        });
        documents.value = results;
        error.value = null;
    },(err)=>{
        console.log(err.message);
        documents.value = null;
        error.value = "could not fetch the data"
    })
    return {error, documents}
}
export default getCollection