const endpoints = Object.freeze({
    remoteBackend: "https://term-project-metdh.ondigitalocean.app",
    localBackend: "http://localhost:8000",
});

const routes = Object.freeze({
    login: "/login",
    signup: "/signup",
    logout: "/logout",
    reset: "/reset",
    chat: "/chat",
    user: "/me",
    forgotPassword: "/forgot-password",
    getAllUsers: "/get-all-users",
    getApiStats: "/api-stats",
    updateApiCalls: "/update-api-calls",
    deleteUser: "/delete-user",
});