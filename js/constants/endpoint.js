const endpoints = Object.freeze({
    // backend: "https://term-project-metdh.ondigitalocean.app", // Local testing, need to change when hosted
    backend:"http://localhost:8000",
    STT: "ep here"
});

const routes = Object.freeze({
    login: "/login",
    signup: "/signup",
    logout: "/logout",
    reset: "/reset",
    chat: "/chat",
    forgotPassword: "/forgot-password",
    getAllUsers: "/get-all-users"
});