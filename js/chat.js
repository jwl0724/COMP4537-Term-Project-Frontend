let userData;



Utils.populatePlaceholderById({
    "input-text": INPUT
});

window.onload = async () => {
    userData = await APIHub.getMe();
    if (userData.role === 'admin') {
        document.getElementById('admin').style.display = 'block';
    } else if (userData.role === 'user') {
        document.getElementById('admin').style.display = 'none';
    } else {
        window.location.href = '/login.html';
    }

    Utils.populateById({
        "history-box-label": HISTORY_BOX_LABEL,
        submit: SUBMIT,
        logout: LOGOUT,
        chat: CHAT,
        admin: ADMIN
    });
};

const chat = new ChatSystem();
document.getElementById("submit").onclick = () => {
    if (document.getElementById("input-text").value !== "") {
        chat.sendPrompt(document.getElementById("input-text").value);
        document.getElementById("input-text").value = "";
    }
};

