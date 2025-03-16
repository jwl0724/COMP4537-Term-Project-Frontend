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
            // const response = { response: "sad:  Aw, tartar sauce! JS doesn't suck!  It's lik…y! I can't wait! To make some delicious JS code!\n" }; // For testing purposes
            console.log("response: ",response);
            const emoteAndText = this.separateMessagesToEmoteAndText(response.response);
            console.log("emoteAndText: ",emoteAndText);
            console.log("emoteAndText.emotion: ",emoteAndText.emotion);
            console.log("emoteAndText.text: ", emoteAndText.text);
            const emotion = Object.values(Sprite.emotions).includes(emoteAndText.emotion)
            ? emoteAndText.emotion
            : Sprite.emotions.neutral;
            // this.#audioManager.playSpeech(response.audio);   // Need to add audio to the response object later
            this.#sprite.emote(emotion);
            this.#textManager.addMessage(emoteAndText.text, TextManager.textType.response);


        } catch (e) {
            this.#sprite.emote(Sprite.emotions.mock);
            this.#textManager.addMessage(ERROR_SERVER, TextManager.textType.response, this.#audioManager, 1.6); // Need to offset cause laugh too long
            this.#audioManager.playSpeech(audio.serverError);
        }
    }

    separateMessagesToEmoteAndText(response) {
        const cleanedResponse = response.replace(/\n/g, '');
        const match = cleanedResponse.match(/^(\w+):\s*(.*)$/);

        if (match) {
            return {
                emotion: match[1],
                text: match[2]
            };
        } else {
            return {
                emotion: "neutral",
                text: response
            };
        }
    }
}