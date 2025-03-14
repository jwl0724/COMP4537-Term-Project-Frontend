class MusicManager {

    #audioElement;

    constructor() {
        this.#audioElement = document.getElementById("bgm");
        this.#audioElement.src = audio.bgm;
    }

    play() {
        this.#audioElement.muted = false; // Causes exception muted isn't a proprety
        this.#audioElement.play();
        this.#audioElement.loop = true;
    }

    stop() {
        this.#audioElement.pause();
        this.#audioElement.currentTime = 0;
    }

    mute() {
        this.#audioElement.muted = true;
    }

    unmute() {
        this.#audioElement.muted = false;
    }
}