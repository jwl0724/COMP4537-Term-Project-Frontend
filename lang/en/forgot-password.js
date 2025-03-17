document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("forgot-password");
    const emailInput = document.getElementById("email");
    const errorMessage = document.getElementById("error-message");
    const submitButton = document.getElementById("submit");

    // Clear error message on user input
    emailInput.addEventListener("input", function () {
        errorMessage.textContent = "";  // Clear error message
    });

    // Handle form submission
    form.addEventListener("submit", async function (event) {
        event.preventDefault();  // Prevent the default form submission

        // Validate email
        const email = emailInput.value.trim();
        if (!email) {
            errorMessage.textContent = "Please enter your email address.";
            return;
        }

        // Disable the submit button to prevent multiple submissions
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        try {
            // Send the password reset request to the backend
            const response = await fetch("/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                // If successful, show a success message
                errorMessage.textContent = "A password reset link has been sent to your email.";
                errorMessage.classList.remove("text-red-500");
                errorMessage.classList.add("text-green-500");
            } else {
                // If an error occurred, show the error message
                errorMessage.textContent = data.error || "Something went wrong. Please try again.";
                errorMessage.classList.remove("text-green-500");
                errorMessage.classList.add("text-red-500");
            }
        } catch (error) {
            // Handle network errors
            errorMessage.textContent = "Network error. Please try again later.";
            errorMessage.classList.remove("text-green-500");
            errorMessage.classList.add("text-red-500");
        } finally {
            // Re-enable the submit button
            submitButton.disabled = false;
            submitButton.textContent = "Send Reset Link";
        }
    });
});
