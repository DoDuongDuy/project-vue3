import { projectStorage } from '../firebase/config'
import { ref } from "vue"
import { useStore } from 'vuex'

const useStorage = () => {
  const error = ref(null)
  const url = ref(null)
  const filePath = ref(null)
  const store = useStore();
  const uploadImage = async (file) => {
    filePath.value = `covers/${store.state.auth.user.uid}/${file.name}`
    const storageRef = projectStorage.ref(filePath.value)

    try {
      const res = await storageRef.put(file)
      url.value = await res.ref.getDownloadURL()
    } catch (err) {
      console.log(err.message)
      error.value = err
    }
  }

  return { uploadImage, url, filePath, error }
}

export default useStorage;