Utils.populateById({
    "history-box-label": HISTORY_BOX_LABEL,
    submit: SUBMIT
});

Utils.populatePlaceholderById({
    "input-text": INPUT
});

const userRole = localStorage.getItem('role');

window.onload = () => {
    if (userRole === 'admin') {
        document.getElementById('admin').style.display = 'block';
    } else if (userRole === 'user') {
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

document.getElementById("logout").innerText = LOGOUT;
document.getElementById("chat").innerText = CHAT;
document.getElementById("admin").innerText = ADMIN;