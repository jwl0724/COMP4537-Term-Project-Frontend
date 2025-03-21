
Utils.populatePlaceholderById({
    "input-text": INPUT
});

Utils.populateById({
    "history-box-label": HISTORY_BOX_LABEL,
    submit: SUBMIT,
    logout: LOGOUT,
    chat: CHAT,
});

window.onload = async () => {
    const userData = await APIHub.getMe();
    console.log(userData.role);
    if (userData.role === 'admin') {
        document.getElementById('admin').style.display = 'block';
        Utils.populateById({
            admin: ADMIN
        });
    } else if (userData.role === 'user') {
        document.getElementById('admin').style.display = 'none';
    } else {
        window.location.href = '/login.html';
    }


};

const chat = new ChatSystem();
document.getElementById("submit").onclick = () => {
    if (document.getElementById("input-text").value !== "") {
        chat.sendPrompt(document.getElementById("input-text").value);
        document.getElementById("input-text").value = "";
    }
};

