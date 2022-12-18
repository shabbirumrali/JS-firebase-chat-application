// dom quries
const list = document.querySelector('.chat-list')
const newChatForm = document.querySelector('form.new-chat')
const newNameForm = document.querySelector('form.new-name')
const updateMessage = document.querySelector('.update-mssg')
const rooms = document.querySelector('.chat-rooms')

// check local storage for a username
const username = localStorage.username ? localStorage.username : "anonymus"

// class instance
const chatUI = new ChatUI(list)
const chatroom = new Chatroom('general', username)

// get chats and render
chatroom.getChats(data => {
    chatUI.render(data)
})

// add new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = newChatForm.message.value.trim()
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(err => console.log("Something went wrong", err))
})
// update name
newNameForm.addEventListener('submit', e => {
    e.preventDefault()

    // update name via chatroom
    const newName = newNameForm.name.value.trim()
    chatroom.updateUsername(newName)
    // reset the form
    newNameForm.name.value = ''
    // show and hide update message

    updateMessage.innerText = `updated username to ${newName}`
setTimeout(() => {
    updateMessage.innerText = ''
}, 3000)
})

rooms.addEventListener('click', e => {
    if(e.target.tagName === "BUTTON") {
        chatUI.clear()
        chatroom.updateRoom(e.target.getAttribute('id'))
        chatroom.getChats(chat => chatUI.render(chat))
    }
}) 