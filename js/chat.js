Utils.populateById({
    "history-box-label": HISTORY_BOX_LABEL,
    submit: SUBMIT
});

Utils.populatePlaceholderById({
    "input-text": INPUT
});


window.onload = () => {
    const cookie = sessionStorage.getItem("cookie");
    if (!cookie) {
        window.location.href = "/index.html";
    }
    console.log("cookie: ", cookie);
    document.cookie = cookie;
};

const chat = new ChatSystem();
document.getElementById("submit").onclick = () => {
    if (document.getElementById("input-text").value !== "") {
        chat.sendPrompt(document.getElementById("input-text").value);
        document.getElementById("input-text").value = "";
    }
};