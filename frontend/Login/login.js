async function login(e) {
    try {
    e.preventDefault();
    console.log(e.target.email);

    const loginDetails = {
        email: e.target.email.value,
        password: e.target.password.value
    }
    console.log(loginDetails)

    await axios.post('http://13.112.50.124:3000user/login', loginDetails).then(response => {
        alert(response.data.message)
        // console.log(response)
        localStorage.setItem('token', response.data.token) // to save the token in local storage.
        window.location.href = "../Expense/expense.html" // change the page on successful
    })
    } catch (err) {
        console.log(JSON.stringify(err))
        // JSON.stringify() method converts a JavaScript value to a JSON string.
        document.body.innerHTML += `<div style="color:red;">${err.message}<div>`;
    }
}

// Forgot Password
function forgotpassword() {
    window.location.href = "../ForgotPassword/forgotPassword.html"
}
