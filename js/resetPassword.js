document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('reset-password-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get the reset token from the query string in the URL
        const token = new URLSearchParams(window.location.search).get('token');
        const newPassword = document.getElementById('new-password').value;
        
        const response = await fetch(`/reset-password?token=${token}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newPassword })
        });

        const result = await response.json();
        if (response.ok) {
            alert('Password successfully reset!');
        } else {
            alert(result.error || 'Error resetting password');
        }
    });
});
