<template>
    <div class="container">
        <Navbar/>
        <ChatWindow></ChatWindow>
        <new-chat-room></new-chat-room>
    </div>
</template>

<script>
import NewChatRoom from "../components/NewChatForm.vue"
import Navbar from "../components/Navbar.vue"
import ChatWindow from "../components/ChatWindow.vue"
export default {
    components:{Navbar, NewChatRoom, ChatWindow}
}
</script>

<style lang="scss" scoped>
    *{
        text-align: left;
    }

</style>