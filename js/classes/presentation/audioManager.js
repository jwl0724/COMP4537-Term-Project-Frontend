class AudioManager {

    #audioElement;

    constructor() {
        this.#audioElement = document.getElementById("speech");
    }

    getAudioLength() {
        return this.#audioElement.duration;
    }

    getAudioPosition() {
        return this.#audioElement.currentTime;
    }

    playSpeech(audio) {
        this.#audioElement.src = audio;
        this.#audioElement.play();
    }
}