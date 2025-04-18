class Sprite {

    static thinkTransitionTimeSeconds = 0.2;

    static #animationNames = Object.freeze({
        FADE_IN: "fadeIn",
        NEXT_EMOTION: "nextEmotion",
        THINK: "think",
        UNTHINK: "unthink"
    });

    static emotions = Object.freeze({
        happy: "happy",
        sad: "sad",
        angry: "angry",
        disgust: "disgust",
        shocked: "shocked",
        mock: "mock",
        think: "think",
        neutral: "neutral"
    });

    #imageField;// Stores the current emotion

    constructor() {
        this.#imageField = document.getElementById("spongebob");
        this.#setupAnimationProperties();
        this.#imageField.src = images[Sprite.emotions.neutral];
        this.#playAnimation(Sprite.#animationNames.FADE_IN, 0.85);
    }

    // Toggle between thinking and normal state
    toggleThink(isThinking) {
        this.#imageField.src = images[Sprite.emotions.think];
        if (isThinking) this.#playAnimation(Sprite.#animationNames.THINK, 0.2);
        else this.#playAnimation(Sprite.#animationNames.UNTHINK, 0.2);
    }

    // Change the sprite's emotion
    emote(emotion) {
        this.#imageField.src = images[emotion];
        this.#playAnimation(Sprite.#animationNames.NEXT_EMOTION, 0.15);
    }

    // Set up animation properties for smoother transitions
    #setupAnimationProperties() {
        this.#imageField.style.animationIterationCount = 1;
        this.#imageField.style.transitionTimingFunction = "ease-in-out";
    }

    // Play a specified animation with a given duration
    #playAnimation(animationName, durationSeconds) {
        this.#imageField.style.animation = "none";
        this.#imageField.offsetHeight; // Forces reflow (i.e. lets animation play again)

        this.#imageField.style.animationFillMode = "forwards"; // Keeps end state of animation
        this.#imageField.style.animationDuration = durationSeconds + "s";
        this.#imageField.style.animationName = animationName;
    }
}