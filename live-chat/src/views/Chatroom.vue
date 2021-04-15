<template>
    <div class="container">
        <Navbar/>
        <new-chat-room></new-chat-room>
    </div>
</template>

<script>
import NewChatRoom from "../components/NewChatForm.vue"
import Navbar from "../components/Navbar.vue"
export default {
    components:{Navbar, NewChatRoom}
}
</script>

<style lang="scss" scoped>
    *{
        /* text-align: left; */
    }

</style>