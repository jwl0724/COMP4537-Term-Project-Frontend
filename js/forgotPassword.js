document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('forgotPassword');
    const emailInput = document.getElementById('email');
    const errorMessage = document.getElementById('error-message');
    const submitButton = document.getElementById('submit');

    // Clear error message when the email input changes
    emailInput.addEventListener('input', () => {
        console.log('Email input changed');
        errorMessage.textContent = '';
    });

    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        console.log('Form submitted with email:', email); // Log the email being submitted

        // Validate email input
        if (!email) {
            console.log('No email entered');
            errorMessage.textContent = 'Please enter an email address.';
            return;
        }

        // If input is valid, handle the submission
        submitButton.disabled = true; // Disable the submit button
        try {
            console.log('Sending POST request to /api/forgotPassword');
            const response = await fetch('www.google.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();
            console.log('Response received:', data); // Log the response data

            if (response.ok) {
                // Success - Show a success message or redirect
                console.log('Password reset email sent successfully');
                errorMessage.textContent = 'Password reset email sent. Please check your inbox.';
                errorMessage.style.color = 'green'; // Optional: style the success message
                window.location.href = 'login.html'; // Redirect to login page
            } else {
                // Show error message from backend
                console.log('Error response:', data.error);
                errorMessage.textContent = data.error || 'Something went wrong. Please try again later.';
                errorMessage.style.color = 'red';
            }
        } catch (error) {
            // Network error handling
            console.error('Error occurred while sending request:', error); // Log network error
            errorMessage.textContent = 'Failed to send request. Please try again later.';
            errorMessage.style.color = 'red';
        } finally {
            submitButton.disabled = false; // Re-enable the submit button
        }
    });
});
