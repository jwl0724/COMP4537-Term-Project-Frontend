Utils.populateById({
    "history-box-label": HISTORY_BOX_LABEL,
    submit: SUBMIT
});

Utils.populatePlaceholderById({
    "input-text": INPUT
});

const chat = new ChatSystem();
document.getElementById("submit").onclick = () => {
    if (document.getElementById("input-text").value !== "") {
        chat.sendPrompt(document.getElementById("input-text").value);
        document.getElementById("input-text").value = "";
    }
};