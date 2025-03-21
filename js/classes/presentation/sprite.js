class Sprite {

    static emotions = Object.freeze({
        happy: "happy",
        sad: "sad",
        angry: "angry",
        disgust: "disgust",
        scared: "scared",
        shocked: "shocked",
        mock: "mock",
        neutral: "neutral"
    });

    #imageField;

    constructor() {
        this.#imageField = document.getElementById("spongebob");
        this.#imageField.src = images[Sprite.emotions.neutral];
    }

    emote(emotion) {
        this.#imageField.src = images[emotion];
    }

    #playSwapAnimation() {
        // TODO: Figure out how to do this part
    }
}