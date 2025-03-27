class APIHub {

    static #backendEP = window.location.protocol.includes("https") ? endpoints.remoteBackend : endpoints.localBackend;

    static async login(email, password) {
        const endpoint = this.#backendEP + routes.login;
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
        const endpoint = this.#backendEP + routes.signup;
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
        const endpoint = this.#backendEP + routes.logout;
        const response = await fetch(endpoint);
        if (response.ok) window.location.href = "/";
    }

    static async chat(text) {
        const endpoint = this.#backendEP + routes.chat;
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
        const endpoint = this.#backendEP + routes.forgotPassword;
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
        const endpoint = this.#backendEP + routes.reset;
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

    }

    static async getAllUsers() {
        const endpoint = this.#backendEP + routes.getAllUsers;
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
        const endpoint = this.#backendEP + routes.user;

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

    static async getApiStats() {
        const endpoint = this.#backendEP + routes.getApiStats;

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

    static async updateApiCalls(email, number) {
        const endpoint = this.#backendEP + routes.updateApiCalls;
        const intNumber = parseInt(number, 10);

        const response = await fetch(endpoint, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                "api_calls_left": intNumber
            })
        });
        return await response.json();
    }

    static async deleteUser(email) {
        const endpoint = this.#backendEP + routes.deleteUser;

        const response = await fetch(endpoint, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email
            })
        });
        return await response.json();
    }
    static async updateRole(email, role) {
        const endpoint = this.#backendEP + routes.updateRole;
        const response = await fetch(endpoint, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                role: role
            })
        });
        return await response.json();
    }
}