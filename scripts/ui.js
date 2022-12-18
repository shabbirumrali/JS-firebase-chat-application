// Chat UI class
class ChatUI {
    constructor(list) {
        this.list = list;
    }
    clear() {
        this.list.innerHTML = ''
    }
    // render method to render ui to the page
    render(data) {
        const when = dateFns.distanceInWordsToNow(
            data.created_at.toDate(), 
            { addSuffix: true }
        )
        const html = `
            <li>
                <span class="username">${data.username}</span>
                <span class="message">${data.message}</span>
                <div class="time">${when}</div>
                <span class="room">this is a ${data.room}</span>
                <hr />
            </li>
        `
        this.list.innerHTML += html
    }
}
