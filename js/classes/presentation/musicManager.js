class MusicManager {

    #audioElement;

    constructor() {
        this.#audioElement = document.getElementById("bgm");
        this.#audioElement.src = audio.bgm;
    }

    // Play the background music in a loop
    play() {
        this.#audioElement.muted = false; // Causes exception muted isn't a property
        this.#audioElement.play();
        this.#audioElement.loop = true;
    }

    // Stop the music and reset its position
    stop() {
        this.#audioElement.pause();
        this.#audioElement.currentTime = 0;
    }

    // Mute the audio
    mute() {
        this.#audioElement.muted = true;
    }

    // Unmute the audio
    unmute() {
        this.#audioElement.muted = false;
    }
}