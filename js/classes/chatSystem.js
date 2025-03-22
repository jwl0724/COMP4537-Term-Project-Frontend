class ChatSystem {

    #sprite;
    #textManager;
    #audioManager;

    constructor() {
        this.#sprite = new Sprite();
        this.#textManager = new TextManager();
        this.#audioManager = new AudioManager();
    }

    async sendPrompt(prompt) {
        this.#textManager.addMessage(prompt, TextManager.textType.prompt);
        this.#sprite.toggleThink(true);
        try {
            const hubResponse = await APIHub.chat(prompt);
            const status = hubResponse.status;
            const response = hubResponse.data;

            if(this.#playError(status, response)) return;

            let emotion = response.emotion;
            const text = response.text;
            let audio = response.audio;

            emotion = Object.values(Sprite.emotions).includes(emotion)
            ? emotion
            : Sprite.emotions.neutral;

            if (!audio) audio = this.#audioManager.getRandomStockAudio();

            this.#sprite.toggleThink(false);
            this.#playChat(emotion, text, audio);

        } catch (e) {
            this.#sprite.toggleThink(false);
            this.#playChat(Sprite.emotions.mock, ERROR_SERVER, audio.serverError, 1.6);
        }
    }

    // Will return true if an error was played, false if no error was played
    #playError(status, response) {
        // TODO: Figure out what error codes are left to go through
        if (status === 401) this.#playChat(Sprite.emotions.angry, ERROR_UNAUTHORIZED, audio.unauthorizedError);
        else if (response.error) this.#playChat(Sprite.emotions.sad, ERROR_CHAT, audio.chatbotError);
        else return false;

        return true;
    }

    #playChat(emotion, text, audio = null, audioOffset = 0) {
        setTimeout(() => {
            this.#sprite.emote(emotion);
            this.#audioManager.playSpeech(audio);

            if (audio) this.#textManager.addMessage(text, TextManager.textType.response, this.#audioManager, audioOffset);
            else this.#textManager.addMessage(text, TextManager.textType.response);

        }, Sprite.thinkTransitionTimeSeconds * 1000);
    }
}