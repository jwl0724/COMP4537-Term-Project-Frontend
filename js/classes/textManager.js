class TextManager {

    #currentMessage;
    #currentElement;
    #textRatio;

    static textType = Object.freeze({
        prompt: "prompt",
        response: "response"
    });

    #historyLog;

    constructor() {
        this.#historyLog = document.getElementById("history-log");
    }

    // type is expected to take from the static textType
    addMessage(message, type, audio = null, audioOffset = 0) {
        // In add is called before last message was finished displaying
        if (this.#textRatio < this.#currentMessage?.length) this.#currentElement.innerHTML = this.#currentMessage;

        const messageElement = document.createElement("p");
        messageElement.classList.add(type);
        messageElement.classList.add("text-yellow-200");


        this.#historyLog.appendChild(messageElement);
        this.#currentElement = messageElement;
        this.#currentMessage = message;
        this.#textRatio = 0;


        // Display the text immediately if it's a prompt
        if (type === TextManager.textType.prompt) {

            messageElement.innerHTML = message;
            messageElement.classList.remove("text-yellow-200");
            return;
        }

        // Display text in sync with the audio element
        const displayLoop = setInterval(() => {
            if (this.#textRatio >= message.length) {
                clearInterval(displayLoop);
                return;
            }
            if (audio) this.#textRatio = audio.getAudioPosition() / (audio.getAudioLength() - audioOffset) * this.#currentMessage.length;
            else this.#textRatio += 25 / 1000 * this.#currentMessage.length;

            this.#currentElement.innerHTML = this.#currentMessage.substring(0, this.#textRatio);
        }, 50);
    }
}