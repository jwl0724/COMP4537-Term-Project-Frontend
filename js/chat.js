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

userData.then(data => {
    window.userAPICalls = data.api_calls_left;
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

const chat = new ChatSystem();
const sendButton = document.getElementById("submit");
sendButton.onclick = () => {
    if (document.getElementById("input-text").value !== "") {
        sendButton.disabled = true;
        chat.sendPrompt(document.getElementById("input-text").value)
        .finally(() => {
            setTimeout(() => {
                sendButton.disabled = false;
            }, 5000);
        });
        document.getElementById("input-text").value = "";
    }
};

document.getElementById("input-text").addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        sendButton.click();
    }
}

);

