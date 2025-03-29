class Credentials {

    #usernameField;
    #errorField;
    #emailField;
    #passwordField;
    #confirmPasswordField;

    constructor() {
        this.#usernameField = document.getElementById("username");
        this.#emailField = document.getElementById("email");
        this.#passwordField = document.getElementById("password");
        this.#confirmPasswordField = document.getElementById("confirmation");
        this.#errorField = document.getElementById("error-message");

        document.getElementById("submit").addEventListener("click", (e) => {
            e.preventDefault();
            if (this.#confirmPasswordField) this.#register();
            else this.#login();
        });
    }

    async #login() {
        const email = this.#emailField.value;
        const password = this.#passwordField.value;

        if (!email || !password) {
            this.#errorField.innerText = ERROR_CREDENTIAL_MISSING;
            return;
        }
        try {
            const data = await APIHub.login(email, password);
            if (data.error) this.#errorField.innerText = data.error;
            else window.location.href = "/chat.html";

        } catch (e) {
            this.#errorField.innerText = ERROR_SERVER;
        }
    }

    async #register() {
        const username = this.#usernameField.value;
        const email = this.#emailField.value;
        const password = this.#passwordField.value;
        const confirmation = this.#confirmPasswordField.value;

        if (!username || !email || !password || !confirmation) {
            this.#errorField.innerText = ERROR_CREDENTIAL_MISSING;
            return;
        }
        if (password !== confirmation) {
            this.#errorField.innerText = ERROR_PASSWORD_MISMATCH;
            return;
        }
        let data;
        try {
            data = await APIHub.register(username, email, password);
            localStorage.setItem("role", data.role);

            if (data.error) this.#errorField.innerText = data.error;

            else window.location.href = "/chat.html";

        } catch (e) {
            this.#errorField.innerText = ERROR_SERVER;
        }
    }


}