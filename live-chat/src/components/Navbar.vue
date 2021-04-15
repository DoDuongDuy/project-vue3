<template>
  <nav v-if="user">
      <div>
          <p>Hey there is...{{user.displayName}} </p>
          <p class="email">Currently logged in as...{{user.email}}</p>
      </div>
      <button @click="handleLogout">Logout</button>
  </nav>
</template>

<script>
import { useRouter } from 'vue-router'
import useLogout from"../composables/useLogout.js"
import getUser from "../composables/getUser.js"
export default {
 setup(props) {
    const {user} = getUser();
    const {error , logout} = useLogout()
    const router = useRouter();
    const handleLogout = async()=>{
        await logout();
        if(!error.value){
            console.log("logged out!!!");
            router.push({name:"Welcome"})
        }
    }
    return {user, handleLogout}
 }
}
</script>

<style lang="scss" scoped>
    nav{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid gray;
        div{
        p{
            margin: 2px;
            font-size: 16px;
            color: black;
            &.email{
                font-size: 14px;
                color: gray;
            }
        }
        }
    }
</style>