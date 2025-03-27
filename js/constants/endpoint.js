const apiVersion = "/api/v1";

const endpoints = Object.freeze({
    remoteBackend: "https://term-project-metdh.ondigitalocean.app",
    localBackend: "http://localhost:8000",
});

const routes = Object.freeze({
    login: apiVersion + "/login",
    signup: apiVersion + "/signup",
    logout: apiVersion + "/logout",
    reset: apiVersion + "/reset",
    chat: apiVersion + "/chat",
    user: apiVersion + "/me",
    forgotPassword: apiVersion + "/forgot-password",
    getAllUsers: apiVersion + "/get-all-users",
    getApiStats: apiVersion + "/endpoint-stats",
    updateApiCalls: apiVersion + "/update-api-calls",
    deleteUser: apiVersion + "/delete-user",
    updateRole: apiVersion + "/update-role",
});