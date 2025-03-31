// This code was assisted by ChatGPT, OpenAI.
Utils.populateById({
    title: TITLE,
    submit: SUBMIT,
    redirect: LOGIN_REDIRECT,
    "email-label": PROMPT,
});

const form = document.getElementById("forgot-password");
const emailInput = document.getElementById("email");
const errorMessage = document.getElementById("error-message");
const submitButton = document.getElementById("submit");


// Event listener to clear the error message when the user starts typing
emailInput.addEventListener("input", () => {
    errorMessage.textContent = "";
});

// Event listener for the form submission
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    if (!email) {
        Utils.populateResponseMessage(errorMessage, ERROR_MISSING_EMAIL);
        return;
    }
    // If the input is valid, proceed with the password reset request
    Utils.setButtonState(submitButton, SENDING, true);
    try {
        const data = await APIHub.forgotPassword(email);
        // Check if the response contains an error
        if (!data.error) Utils.populateResponseMessage(errorMessage, CONFIRM, style.greenText, style.redText);
        else Utils.populateResponseMessage(errorMessage, ERROR_SERVER, style.redText, style.greenText);

    } catch(error) {
        Utils.populateResponseMessage(errorMessage, ERROR_NETWORK, style.redText, style.greenText)
    } finally {
        Utils.setButtonState(submitButton, SUBMIT, false);
    }
});