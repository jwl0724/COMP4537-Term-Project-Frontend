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
        try {
            const response = await APIHub.chat(prompt);
            this.#textManager.addMessage(response.text, TextManager.textType.response, this.#audioManager);
            this.#audioManager.playSpeech(response.audio);
            this.#sprite.emote(response.emotion);
            // Going to need the AI to say it's emotion in like the first word or something like that
            this.#sprite.emote(Sprite.emotions.happy);

        } catch(e) {
            this.#sprite.emote(Sprite.emotions.mock);
            this.#textManager.addMessage(ERROR_SERVER, TextManager.textType.response, this.#audioManager, 1.6); // Need to offset cause laugh too long
            this.#audioManager.playSpeech(audio.serverError);
        }
    }
}