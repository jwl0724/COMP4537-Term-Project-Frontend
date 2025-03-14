class Credentials {

    #errorField;
    #emailField;
    #passwordField;
    #confirmPasswordField;

    constructor() {
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

        let data;
        try {
            data = await APIHub.login(email, password);
            if (data.error) this.#errorField.innerText = data.error;
            else window.location.href = "/chat";

        } catch(e) {
            this.#errorField.innerText = ERROR_SERVER;
        }
    }

    async #register() {
        const email = this.#emailField.value;
        const password = this.#passwordField.value;
        const confirmation = this.#confirmPasswordField.value;

        if (!email || !password || !confirmation) {
            this.#errorField.innerText = ERROR_CREDENTIAL_MISSING;
            return;
        }

        if (password !== confirmation) {
            this.#errorField.innerText = ERROR_PASSWORD_MISMATCH;
            return;
        }

        let data;
        try {
            data = await APIHub.login(email, password);
            if (data.error) this.#errorField.innerText = data.error;
            else window.location.href = "/chat";

        } catch(e) {
            this.#errorField.innerText = ERROR_SERVER;
        }
    }
}