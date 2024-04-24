document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const loginStatus = document.getElementById("loginStatus");
    const registerStatus = document.getElementById("registerStatus");
    const errorDiv = document.getElementById("error");

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    const validateUsername = (username) => {
        return username.trim() !== "" && username.length >= 4;
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const register = (e) => {
        e.preventDefault();
        const email = registerForm.email.value;
        const username = registerForm.username.value;
        const password = registerForm.password.value;

        if (!validateEmail(email)) {
            errorDiv.textContent = "Invalid email address";
            return;
        }

        if (!validateUsername(username)) {
            errorDiv.textContent = "Username should be at least 4 characters long";
            return;
        }

        if (!validatePassword(password)) {
            errorDiv.textContent = "Password should be at least 6 characters long";
            return;
        }

        // You can replace the URL with your backend endpoint
        axios.post("http://localhost:3001/register", {
            email: email,
            username: username,
            password: password,
        }).then((response) => {
            if (response.data.message) {
                registerStatus.textContent = response.data.message;
            } else {
                registerStatus.textContent = "ACCOUNT CREATED SUCCESSFULLY";
            }
        }).catch((error) => {
            console.error("Error:", error);
        });
    };

    const login = (e) => {
        e.preventDefault();
        const username = loginForm.username.value;
        const password = loginForm.password.value;

        axios.post("http://localhost:3001/login", {
            username: username,
            password: password,
        }).then((response) => {
            if (response.data.message) {
                loginStatus.textContent = response.data.message;
            } else {
                loginStatus.textContent = response.data[0].email;
                // Redirect to home or handle login success
                window.location.href = '/vite-deploy/LoggedIN.html';
            }
        }).catch((error) => {
            console.error("Error:", error);
        });
    };

    loginForm.addEventListener("submit", login);
    registerForm.addEventListener("submit", register);
});
