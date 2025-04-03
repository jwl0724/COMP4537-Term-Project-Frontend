// This code was assisted by ChatGPT, OpenAI.
// Initialize a variable to store the user's remaining API calls
const userRole = localStorage.getItem('role');

if (userRole !== 'admin') {
    window.location.href = '/index.html';
}

window.userAPICalls = null;

Utils.populatePlaceholderById({
    "input-text": INPUT,
});

Utils.populateById({
    "history-box-label": HISTORY_BOX_LABEL,
    submit: SUBMIT,
    logout: LOGOUT,
    chat: CHAT,
});



// Fetch user data 
userData.then(data => {
    // Store the user's remaining API calls in a global variable
    window.userAPICalls = data.api_calls_left;

    // Check the user's role and update the UI accordingly
    if (data.role === "admin") {
        document.getElementById("admin").style.display = "block";
        Utils.populateById({
            admin: ADMIN            
        });
    }

    else if (data.role === "user") document.getElementById("admin").style.display = "none";
    else window.location.href = "/login.html";

    Utils.populateById({
        'welcome-message': WELCOME_MESSAGE + data.user_name,
        apiLeft: API_LEFT + (data.api_calls_left === -1 ? "∞" : data.api_calls_left)
    });

})

// Instantiate a new ChatSystem object to handle chat interactions
const chat = new ChatSystem();
const sendButton = document.getElementById("submit");

sendButton.onclick = () => {
    if (document.getElementById("input-text").value !== "") {
        // Send the user's prompt to the chat system and handle the response
        sendButton.disabled = true;
        chat.sendPrompt(document.getElementById("input-text").value)
        .finally(() => {
            // Re-enable the send button after 5 seconds
            setTimeout(() => {
                sendButton.disabled = false;
            }, 5000);
        });
        document.getElementById("input-text").value = "";
    }
};

// Add an event listener to the input text field to handle "Enter" key press
document.getElementById("input-text").addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        sendButton.click();
    }
}

);

