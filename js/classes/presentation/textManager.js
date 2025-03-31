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

        // Create a new paragraph element for the message
        const messageElement = document.createElement("p");
        messageElement.classList.add(type);
        messageElement.classList.add(style.yellowText);

        // Append the new message element to the history log
        this.#historyLog.appendChild(messageElement);
        this.#currentElement = messageElement;
        this.#currentMessage = message;
        this.#textRatio = 0;


        // Display the text immediately if it's a prompt
        if (type === TextManager.textType.prompt) {

            messageElement.innerHTML = message;
            messageElement.classList.remove(style.yellowText);
            return;
        }

        // Display text in sync with the audio element
        const displayLoop = setInterval(() => {
            if (this.#textRatio >= message.length) {
                clearInterval(displayLoop);
                return;
            }
            // Calculate the text display ratio based on audio progress or default speed
            if (audio) this.#textRatio = audio.getAudioPosition() / (audio.getAudioLength() - audioOffset) * this.#currentMessage.length;
            else this.#textRatio += 25 / 1000 * this.#currentMessage.length;

            // Update the displayed text
            this.#currentElement.innerHTML = this.#currentMessage.substring(0, this.#textRatio);
        }, 50);
    }
}