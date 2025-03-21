Utils.populatePlaceholderById({
    "input-text": INPUT,
});

userData.then(data => {
    if (data.role === "admin") document.getElementById("admin").style.display = "block";
    else if (data.role === "user") document.getElementById("admin").style.display = "none";
    else window.location.href = "/login.html";
    
    Utils.populatePlaceholderById({
        "history-box-label": HISTORY_BOX_LABEL,
        submit: SUBMIT,
        logout: LOGOUT,
        chat: CHAT,
        admin: ADMIN
    });
})

const chat = new ChatSystem();
document.getElementById("submit").onclick = () => {
    if (document.getElementById("input-text").value !== "") {
        chat.sendPrompt(document.getElementById("input-text").value);
        document.getElementById("input-text").value = "";
    }
};

