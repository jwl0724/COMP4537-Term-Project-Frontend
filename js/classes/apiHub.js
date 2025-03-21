class APIHub {

    static async login(email, password) {
        const endpoint = endpoints.backend + routes.login;
        const response = await fetch(endpoint, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        return await response.json();
    }

    static async register(email, password) {
        const endpoint = endpoints.backend + routes.signup;
        const response = await fetch(endpoint, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });


        return await response.json();
    }

    static async logout() {
        const endpoint = endpoints.backend + routes.logout;
        const response = await fetch(endpoint);
        if (response.ok) window.location.href = "/";
    }

    static async chat(text) {
        const endpoint = endpoints.backend + routes.chat;
        const response = await fetch(endpoint, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: text
            })
        });
        const data = await response.json();
        return {
            data: data,
            status: response.status
        };
    }

    static async forgotPassword(email) {
        const endpoint = endpoints.backend + routes.forgotPassword;
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email
            })
        });
        return await response.json();
    }

    // TODO: See if this is needed for after reset link was clicked
    static async reset(email) {
        const endpoint = endpoints.backend + routes.reset;
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email
            })
        });
        return await response.json();
    }

    // TODO: Implement way later
    static async stt(audio) {
        const endpoint = endpoints.STT;
    }

    static async getAllUsers() {
        const endpoint = endpoints.backend + routes.getAllUsers;
        const response = await fetch(endpoint, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        });
        return await response.json();
    }

    static async getMe() {
        const endpoint = endpoints.backend + "/me";
        const response = await fetch(endpoint, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.status === 403) return null;
        else return await response.json();
    }
}