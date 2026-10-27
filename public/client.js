const socket = io();

const form  = document.querySelector('#form')
const uNameInput = document.querySelector('#username')
const messageInput = document.querySelector('#input')
const messageUl = document.querySelector('#messages')

function getRandomHexColor(){
    const hex = Math.floor(Math.random()* 0xffffff).toString(16);
    return `#${hex.padStart(6,'0')}`
}

form.addEventListener('submit', (e) => {
    e.preventDefault();


    const username = uNameInput.value.trim()
    const message = messageInput.value.trim()

    if(username !== "" && message !== ""){
        socket.emit('message', {username, message})
        messageInput.value = '';
    }
});

socket.on('message', (data) => {
    const li = document.createElement('li')

    const span = document.createElement('span');
    span.className = 'Uname';
    span.style.color = getRandomHexColor();
    span.textContent = data.username;

    li.appendChild(span)
    li.append(`:${data.message}`)

    messageUl.appendChild(li)
})