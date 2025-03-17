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
            if (response.error) {
                this.#sprite.emote(Sprite.emotions.sad);
                this.#textManager.addMessage(ERROR_CHAT); // Include stock audio response later
                return;
            }

            let emotion = response.emotion;
            const text = response.text;

            emotion = Object.values(Sprite.emotions).includes(emotion)
            ? emotion
            : Sprite.emotions.neutral;

            // this.#audioManager.playSpeech(response.audio);   // Need to add audio to the response object later
            this.#sprite.emote(emotion);
            this.#textManager.addMessage(text, TextManager.textType.response);


        } catch (e) {
            this.#sprite.emote(Sprite.emotions.mock);
            this.#textManager.addMessage(ERROR_SERVER, TextManager.textType.response, this.#audioManager, 1.6); // Need to offset cause laugh too long
            this.#audioManager.playSpeech(audio.serverError);
        }
    }
}