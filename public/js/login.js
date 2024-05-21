const $ = document

const username = $.querySelector('.username')
const password = $.querySelector('.password')
const button = $.querySelector('button')

button.addEventListener('click', (e) => {

    e.preventDefault()

    let userData = {
        username: username.value,
        password: password.value,
    };

    fetch('http://localhost:3000/auth/login/', {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(userData)
    })
    .then(res => res.json()).then(data => console.log(data))
    .catch(err => console.error(err));

})

// username - password
// Get - Post
// http://localhost:3000/auth/register/