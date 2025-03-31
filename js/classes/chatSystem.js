

class ChatSystem {

    #sprite;
    #textManager;
    #audioManager;

    constructor() {
        this.#sprite = new Sprite();
        this.#textManager = new TextManager();
        this.#audioManager = new AudioManager();
    }

    // Method to send a prompt to the chatbot
    async sendPrompt(prompt) {
        // If there are no remaining API calls, show error and stop
        if (window.userAPICalls === 0) {
            this.#playChat(Sprite.emotions.angry, ERROR_CHAT, audio.chatbotError, 1.6);
            window.alert(NO_API_LEFT);
            return;
        }
        // Add the prompt message to the text manager
        this.#textManager.addMessage(prompt, TextManager.textType.prompt);
        // Activate the thinking animation for the sprite
        this.#sprite.toggleThink(true);
        try {
            // Send the prompt to the API and await response
            const hubResponse = await APIHub.chat(prompt);
            const status = hubResponse.status;
            const response = hubResponse.data;

            if (this.#playError(status, response)) return;

            // Process the received emotion, text, and audio URL from the API response
            let emotion = response.emotion;
            const text = response.text;
            let audio = response.audioUrl;

            // If emotion is not valid, set it to neutral
            emotion = Object.values(Sprite.emotions).includes(emotion)
                ? emotion
                : Sprite.emotions.neutral;

            // If no audio is provided, select a random stock audio
            if (!audio) audio = this.#audioManager.getRandomStockAudio();

            // Deactivate the thinking animation for the sprite
            this.#sprite.toggleThink(false);

            // Play the chat with the appropriate emotion, text, and audio
            this.#playChat(emotion, text, audio);
            // Decrease the remaining API calls and update the UI
            if (window.userAPICalls !== -1) {
                window.userAPICalls -= 1;
                document.getElementById("apiLeft").innerText = API_LEFT + window.userAPICalls;
            }


        } catch (e) {
            this.#sprite.toggleThink(false);
            this.#playChat(Sprite.emotions.mock, ERROR_SERVER, audio.serverError, 1.6);
        }
    }

    // Will return true if an error was played, false if no error was played
    #playError(status, response) {
        // Handle different error cases based on status code and response error
        if (status === 401) this.#playChat(Sprite.emotions.angry, ERROR_UNAUTHORIZED, audio.unauthorizedError);
        else if (response.error) this.#playChat(Sprite.emotions.sad, ERROR_CHAT, audio.chatbotError);
        else return false;

        return true;
    }

    // Method to make the sprite emote and play audio while displaying text
    #playChat(emotion, text, audio = null, audioOffset = 0) {
        setTimeout(() => {
            // Trigger sprite animation for the given emotion
            this.#sprite.emote(emotion);
            // Play the speech audio (if available)
            this.#audioManager.playSpeech(audio);

            // Add the response message to the text manager, with the optional audio offset
            if (audio) this.#textManager.addMessage(text, TextManager.textType.response, this.#audioManager, audioOffset);
            else this.#textManager.addMessage(text, TextManager.textType.response);

        }, Sprite.thinkTransitionTimeSeconds * 1000);
    }
}