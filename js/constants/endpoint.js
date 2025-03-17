const endpoints = Object.freeze({
    backend: "http://localhost:8000", // Local testing, need to change when hosted
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