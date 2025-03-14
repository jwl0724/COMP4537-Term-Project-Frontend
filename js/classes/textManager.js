class TextManager {

    static textType = Object.freeze({
        prompt: "prompt",
        response: "response"
    });

    #historyLog;

    constructor() {
        this.#historyLog = document.getElementById("history-log");
    }

    // type is expected to take from the static textType
    addMessage(message, type) {
        const messageElement = document.createElement("p");
        messageElement.classList.add(type);
        messageElement.innerHTML = message;
        this.#historyLog.appendChild(messageElement);
    }
}